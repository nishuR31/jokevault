import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const JokeOfTheDay = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareCount, setShareCount] = useState(247);

  const jokeOfTheDay = {
    id: "joke-of-day-2025-01-07",
    text: `A man walks into a library and asks for books on paranoia.\n\nThe librarian whispers, "They're right behind you!"`,
    category: "Classic",
    author: "Library of Laughs",
    likes: 8934,
    shares: shareCount,
    readTime: "12 sec",
    difficulty: "Medium",
    tags: ["Paranoia", "Library", "Wordplay", "Classic"],
    datePosted: "January 7, 2025",
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    setShareCount((prev) => prev + 1);
    // In a real app, this would trigger share functionality
    navigator
      .share?.({
        title: "JokeVault - Joke of the Day",
        text: jokeOfTheDay?.text,
        url: window.location?.href,
      })
      ?.catch(() => {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard?.writeText(
          `${jokeOfTheDay?.text}\n\n- From JokeVault`
        );
      });
  };

  return (
    <section className="relative px-4 py-16 overflow-hidden sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-0 transform -translate-x-1/2 rounded-full left-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 font-medium text-white rounded-full bg-gradient-to-r from-primary to-secondary">
            {/* <Icon name="Star" size={20} /> */}
            <img src="/logo.png" alt="jokevault" className="w-5 h-5 object-contain inline-block" />
            Joke of the Day
          </div>
          <h2 className="mb-4 text-3xl font-bold font-poppins md:text-4xl text-foreground">
            Today's Featured
            <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              {" "}
              Comedy{" "}
            </span>
          </h2>
          <p className="text-lg font-inter text-muted-foreground">
            Handpicked by our comedy curators • {jokeOfTheDay?.datePosted}
          </p>
        </div>

        <div className="p-8 border-2 glassmorphic-card rounded-3xl md:p-12 border-primary/20 hover:border-primary/40 comedy-timing">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium border rounded-full bg-primary/20 text-primary border-primary/30">
                {jokeOfTheDay?.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-400 border rounded-full bg-yellow-400/20 border-yellow-400/30">
                {jokeOfTheDay?.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span className="text-sm">{jokeOfTheDay?.readTime}</span>
            </div>
          </div>

          {/* Joke Content */}
          <div className="mb-8 text-center">
            <blockquote className="relative mb-6 text-xl leading-relaxed font-inter md:text-2xl text-foreground">
              <div className="absolute font-serif text-6xl -top-4 -left-4 text-primary/20">
                "
              </div>
              <div className="relative z-10 whitespace-pre-line">
                {jokeOfTheDay?.text}
              </div>
              <div className="absolute font-serif text-6xl -bottom-4 -right-4 text-primary/20">
                "
              </div>
            </blockquote>
            <cite className="text-lg not-italic font-inter text-muted-foreground">
              — {jokeOfTheDay?.author}
            </cite>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {jokeOfTheDay?.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 text-sm rounded-full cursor-pointer bg-muted/30 text-muted-foreground hover:bg-primary/20 hover:text-primary comedy-timing"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg comedy-timing hover-lift ${
                  isLiked
                    ? "text-red-400 bg-red-400/20 border border-red-400/30"
                    : "text-muted-foreground hover:text-red-400 hover:bg-red-400/10"
                }`}
              >
                <Icon
                  name={isLiked ? "Heart" : "Heart"}
                  size={20}
                  className={isLiked ? "fill-current" : ""}
                />
                <span className="font-medium">
                  {jokeOfTheDay?.likes?.toLocaleString()}
                </span>
              </button>

              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg comedy-timing hover-lift ${
                  isBookmarked
                    ? "text-primary bg-primary/20 border border-primary/30"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                <Icon
                  name="Bookmark"
                  size={20}
                  className={isBookmarked ? "fill-current" : ""}
                />
                <span className="font-medium">Save</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-secondary hover:bg-secondary/10 comedy-timing hover-lift"
              >
                <Icon name="Share2" size={20} />
                <span className="font-medium">{shareCount}</span>
              </button>
            </div>

            <Link to="/joke-detail-page">
              <Button
                variant="outline"
                iconName="ExternalLink"
                iconPosition="right"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation to more jokes */}
        <div className="mt-12 text-center">
          <Link to="/category-explorer">
            <Button
              variant="default"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explore More Jokes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JokeOfTheDay;
