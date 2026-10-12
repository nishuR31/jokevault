import mongoose from "mongoose";
import codes from "../utils/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import isEmpty from "../utils/isEmpty.js";
import { cacheGet, cacheSet, cacheDel } from "../config/redis.js";

//////////////////////////////////////////////////////////////

export async function deleteJoke(request, reply) {
  const { id } = request.params;

  // Verify admin authorization
  if (request.user && !request.user.role.includes("admin")) {
    return reply
      .status(codes.forbidden)
      .send(
        new ApiErrorResponse(
          "Forbidden: Regular users cannot delete jokes. Admin privileges required.",
          codes.forbidden
        ).res()
      );
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return reply
      .status(codes.badRequest)
      .send(new ApiErrorResponse("Invalid joke ID", codes.badRequest).res());
  }

  const deletedJoke = await Joke.findByIdAndDelete(id);

  if (!deletedJoke) {
    return reply
      .status(codes.notFound)
      .send(new ApiErrorResponse("Joke not found", codes.notFound).res());
  }

  // Invalidate tags cache
  await cacheDel("joke:tags");

  return reply.status(codes.ok).send(
    new ApiResponse("Joke successfully deleted", codes.ok, {
      id: deletedJoke._id,
      joke: deletedJoke.joke,
      tags: deletedJoke.tags,
      rating: deletedJoke.rating,
    }).res()
  );
}

///////////////////////////////////////////////

export async function editJoke(request, reply) {
  const { id } = request.params;
  const { joke, tags, rating } = request.body || {};

  if (request.user && !request.user.role.includes("admin")) {
    return reply
      .status(codes.forbidden)
      .send(
        new ApiErrorResponse(
          "Forbidden: Regular users cannot edit jokes. Admin privileges required.",
          codes.forbidden
        ).res()
      );
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse("ID is wrong or invalid", codes.badRequest).res()
      );
  }

  const payload = {};
  if (joke !== undefined) payload.joke = joke;
  if (tags !== undefined) payload.tags = tags;
  if (rating !== undefined) payload.rating = rating;

  const updatedJoke = await Joke.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedJoke) {
    return reply
      .status(codes.notFound)
      .send(
        new ApiErrorResponse("No joke found to update", codes.notFound).res()
      );
  }

  // Invalidate tags cache
  await cacheDel("joke:tags");

  return reply.status(codes.ok).send(
    new ApiResponse("Joke successfully updated", codes.ok, {
      id: updatedJoke._id,
      joke: updatedJoke.joke,
      tags: updatedJoke.tags,
      rating: updatedJoke.rating,
    }).res()
  );
}

//////////////////////////////////////////////////////////

export async function getJoke(request, reply) {
  let tags = request.query.tags;

  // Enhanced behavior from 'joke' repo:
  // If no tags provided, fetch a random joke from the whole database
  if (!tags) {
    const randomJoke = await Joke.aggregate([
      { $sample: { size: 1 } },
      { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
    ]);

    if (!randomJoke || randomJoke.length === 0) {
      return reply
        .status(codes.notFound)
        .send(new ApiErrorResponse("No jokes available in the vault", codes.notFound).res());
    }

    return reply.status(codes.ok).send(
      new ApiResponse("Random joke fetched successfully", codes.ok, {
        joke: randomJoke[0],
      }).res()
    );
  }

  let tagList = Array.isArray(tags) ? tags : [tags];

  if (isEmpty(tagList)) {
    return reply
      .status(codes.badRequest)
      .send(new ApiErrorResponse("Tag is empty", codes.badRequest).res());
  }

  let joke = await Joke.aggregate([
    { $match: { tags: { $in: tagList } } },
    { $sample: { size: 1 } },
    { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
  ]);

  if (!joke || joke.length === 0) {
    return reply
      .status(codes.notFound)
      .send(new ApiErrorResponse("Joke not found for given tags", codes.notFound).res());
  }

  return reply.status(codes.ok).send(
    new ApiResponse("Joke fetched successfully", codes.ok, {
      joke: joke[0],
    }).res()
  );
}

////////////////////////////////////////////////////////////////

export async function getJokes(request, reply) {
  let tags = request.query.tags;
  let count = parseInt(request.query.count) || parseInt(request.query.limit) || 5;

  // Enhanced behavior from 'joke' repo:
  // If no tags provided, return sample of random jokes
  if (!tags) {
    let sampleJokes = await Joke.aggregate([
      { $sample: { size: count } },
      { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
    ]);

    return reply.status(codes.ok).send(
      new ApiResponse("Random jokes fetched successfully", codes.ok, {
        jokes: sampleJokes,
        count: sampleJokes.length,
      }).res()
    );
  }

  let tagList = Array.isArray(tags) ? tags : [tags];

  if (isEmpty(tagList)) {
    return reply
      .status(codes.badRequest)
      .send(new ApiErrorResponse("Tag is empty", codes.badRequest).res());
  }

  let jokes = await Joke.aggregate([
    { $match: { tags: { $in: tagList } } },
    { $limit: count },
    { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
  ]);

  if (!jokes || jokes.length === 0) {
    return reply
      .status(codes.notFound)
      .send(new ApiErrorResponse("No jokes found matching the tags", codes.notFound).res());
  }

  return reply.status(codes.ok).send(
    new ApiResponse("Jokes fetched successfully", codes.ok, {
      jokes: jokes,
      count: jokes.length,
    }).res()
  );
}

/////////////////////////////////////////////////

export async function getTags(request, reply) {
  const cachedTags = await cacheGet("joke:tags", "list");
  if (cachedTags) {
    try {
      const parsed = JSON.parse(cachedTags);
      return reply.status(codes.ok).send(
        new ApiResponse("Tags found successfully (cached)", codes.ok, {
          tags: parsed,
        }).res()
      );
    } catch {
      // ignore parse error and re-fetch
    }
  }

  let tagAggr = await Joke.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: null, tagList: { $addToSet: "$tags" } } },
    { $project: { _id: 0, tagList: 1 } },
  ]);

  const tags = tagAggr[0]?.tagList || [];
  if (isEmpty(tags)) {
    return reply
      .status(codes.notFound)
      .send(new ApiErrorResponse("No tags found in the database", codes.notFound).res());
  }

  await cacheSet("joke:tags", "list", JSON.stringify(tags));

  return reply.status(codes.ok).send(
    new ApiResponse("Tags found successfully", codes.ok, {
      tags: tags,
    }).res()
  );
}

//////////////////////////////////////////////////////////////

export async function jokeId(request, reply) {
  let { id } = request.params;
  if (!id) {
    return reply
      .status(codes.badRequest)
      .send(new ApiErrorResponse("ID is required", codes.badRequest).res());
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return reply
      .status(codes.badRequest)
      .send(new ApiErrorResponse("Invalid ID format", codes.badRequest).res());
  }

  let joke = await Joke.findById(id).select("-__v");
  if (!joke) {
    return reply
      .status(codes.notFound)
      .send(
        new ApiErrorResponse("Joke not found", codes.notFound, { id }).res()
      );
  }

  return reply.status(codes.ok).send(
    new ApiResponse(`Joke with id ${id} found successfully`, codes.ok, {
      joke: joke.joke,
      rating: joke.rating,
      tags: joke.tags,
      _id: joke._id,
      createdAt: joke.createdAt,
    }).res()
  );
}

///////////////////////////////////////////////

export async function paginate(request, reply) {
  let page = Math.max(1, parseInt(request.query.page) || 1);
  let limit = Math.max(1, Math.min(100, parseInt(request.query.limit) || 10));
  let size = (page - 1) * limit;

  let totalJokes = await Joke.countDocuments();
  let totalPages = Math.ceil(totalJokes / limit) || 1;

  if (page > totalPages && totalJokes > 0) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Page number exceeds total pages",
          codes.badRequest
        ).res()
      );
  }

  let jokes = await Joke.find()
    .skip(size)
    .limit(limit)
    .select("-__v")
    .lean();

  let remainingJokes = Math.max(0, totalJokes - size - jokes.length);

  return reply.status(codes.ok).send(
    new ApiResponse(
      `${jokes.length} jokes fetched. ${remainingJokes} jokes remaining.`,
      codes.ok,
      {
        jokes: jokes,
        page: page,
        limit: limit,
        totalJokes: totalJokes,
        remainingJokes: remainingJokes,
        totalPages: totalPages,
        hasMore: page < totalPages,
        nextPage: page < totalPages ? page + 1 : null,
      }
    ).res()
  );
}

//////////////////////////////////////////////

export async function newJoke(request, reply) {
  let { joke, tags, rating } = request.body || {};

  if (request.user && !request.user.role.includes("admin")) {
    return reply
      .status(codes.forbidden)
      .send(
        new ApiErrorResponse(
          "Forbidden: Regular users cannot create jokes. Admin privileges required.",
          codes.forbidden
        ).res()
      );
  }

  if (!joke || !tags || (Array.isArray(tags) && tags.length === 0)) {
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          "Joke text and at least one tag are required.",
          codes.badRequest
        ).res()
      );
  }

  try {
    let createdJoke = await Joke.create({
      joke,
      tags: Array.isArray(tags) ? tags : [tags],
      rating: rating !== undefined ? Number(rating) : 0,
    });

    await cacheDel("joke:tags");

    return reply.status(codes.created).send(
      new ApiResponse("Joke created successfully", codes.created, {
        id: createdJoke._id,
        joke: createdJoke.joke,
        tags: createdJoke.tags,
        rating: createdJoke.rating,
      }).res()
    );
  } catch (err) {
    if (err.code === 11000) {
      return reply
        .status(codes.conflict)
        .send(
          new ApiErrorResponse(
            "This joke already exists in JokeVault!",
            codes.conflict
          ).res()
        );
    }
    return reply
      .status(codes.badRequest)
      .send(
        new ApiErrorResponse(
          err.message || "Joke creation failed",
          codes.badRequest
        ).res()
      );
  }
}
