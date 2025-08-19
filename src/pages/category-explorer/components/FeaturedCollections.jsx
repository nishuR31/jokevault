import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FeaturedCollections = () => {
  const featuredCollections = [
    {
      id: 1,
      title: "Office-Friendly Humor",
      description: "Clean jokes perfect for workplace conversations and presentations",
      jokeCount: 156,
      thumbnail: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=200&fit=crop",
      tags: ["workplace", "clean", "professional"],
      rating: 4.8,
      curator: "Comedy Pro",
      isNew: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Dad Jokes Hall of Fame",
      description: "The most groan-worthy and beloved dad jokes that never get old",
      jokeCount: 234,
      thumbnail: "https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?w=400&h=200&fit=crop",
      tags: ["dad jokes", "family", "wholesome"],
      rating: 4.9,
      curator: "Dad Joke Master",
      isNew: true,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Clever Wordplay",
      description: "Sophisticated puns and linguistic humor for the intellectually curious",
      jokeCount: 189,
      thumbnail: "https://images.pixabay.com/photo/2016/03/26/13/09/cup-of-coffee-1280537_1280.jpg?w=400&h=200&fit=crop",
      tags: ["puns", "wordplay", "clever"],
      rating: 4.7,
      curator: "Word Wizard",
      isNew: false,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Quick Wit Collection",
      description: "Lightning-fast one-liners and snappy comebacks for any situation",
      jokeCount: 298,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      tags: ["one-liners", "quick", "witty"],
      rating: 4.6,
      curator: "Wit Master",
      isNew: false,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Wholesome Giggles",
      description: "Feel-good humor that brings smiles without any edge or controversy",
      jokeCount: 167,
      thumbnail: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=400&h=200&fit=crop",
      tags: ["wholesome", "family", "positive"],
      rating: 4.9,
      curator: "Sunshine Comedy",
      isNew: true,
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      id: 6,
      title: "Tech Humor Hub",
      description: "Programming jokes, IT humor, and tech-savvy comedy for digital natives",
      jokeCount: 142,
      thumbnail: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png?w=400&h=200&fit=crop",
      tags: ["tech", "programming", "nerdy"],
      rating: 4.5,
      curator: "Code Comedian",
      isNew: false,
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-poppins font-bold text-2xl text-foreground mb-2">
            Featured Collections
          </h2>
          <p className="text-muted-foreground">
            Curated joke sets handpicked by our comedy experts
          </p>
        </div>
        <Link 
          to="/search-discovery?tab=collections"
          className="flex items-center space-x-2 text-primary hover:text-primary/80 comedy-timing"
        >
          <span className="font-medium">View All</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCollections?.map((collection, index) => (
          <div
            key={collection?.id}
            className="glassmorphic-card rounded-xl overflow-hidden hover-lift comedy-timing stagger-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Collection Header */}
            <div className="relative h-32 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${collection?.gradient} opacity-80`}></div>
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${collection?.thumbnail})` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">{collection?.jokeCount}</div>
                  <div className="text-sm opacity-90">Jokes</div>
                </div>
              </div>
              
              {collection?.isNew && (
                <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                  New
                </div>
              )}
            </div>

            {/* Collection Content */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                  {collection?.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {collection?.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {collection?.tags?.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-full border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Collection Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span>{collection?.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="User" size={14} />
                    <span>{collection?.curator}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/search-discovery?collection=${collection?.id}`}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg hover:opacity-90 comedy-timing font-medium"
              >
                <Icon name="Play" size={16} />
                <span>Explore Collection</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;