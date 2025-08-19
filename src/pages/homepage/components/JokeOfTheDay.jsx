import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JokeOfTheDay = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareCount, setShareCount] = useState(247);

  const jokeOfTheDay = {
    id: 'joke-of-day-2025-01-07',
    text: `A man walks into a library and asks for books on paranoia.\n\nThe librarian whispers, "They're right behind you!"`,
    category: 'Classic',
    author: 'Library of Laughs',
    likes: 8934,
    shares: shareCount,
    readTime: '12 sec',
    difficulty: 'Medium',
    tags: ['Paranoia', 'Library', 'Wordplay', 'Classic'],
    datePosted: 'January 7, 2025'
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    setShareCount(prev => prev + 1);
    // In a real app, this would trigger share functionality
    navigator.share?.({
      title: 'JokeVault - Joke of the Day',
      text: jokeOfTheDay?.text,
      url: window.location?.href
    })?.catch(() => {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(`${jokeOfTheDay?.text}\n\n- From JokeVault`);
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium mb-4">
            <Icon name="Star" size={20} />
            Joke of the Day
          </div>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
            Today's Featured
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Comedy </span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground">
            Handpicked by our comedy curators • {jokeOfTheDay?.datePosted}
          </p>
        </div>

        <div className="glassmorphic-card rounded-3xl p-8 md:p-12 border-2 border-primary/20 hover:border-primary/40 comedy-timing">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30">
                {jokeOfTheDay?.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                {jokeOfTheDay?.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span className="text-sm">{jokeOfTheDay?.readTime}</span>
            </div>
          </div>

          {/* Joke Content */}
          <div className="text-center mb-8">
            <blockquote className="font-inter text-xl md:text-2xl text-foreground leading-relaxed mb-6 relative">
              <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif">"</div>
              <div className="relative z-10 whitespace-pre-line">
                {jokeOfTheDay?.text}
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl text-primary/20 font-serif">"</div>
            </blockquote>
            <cite className="font-inter text-lg text-muted-foreground not-italic">
              — {jokeOfTheDay?.author}
            </cite>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {jokeOfTheDay?.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted/30 text-muted-foreground hover:bg-primary/20 hover:text-primary comedy-timing cursor-pointer"
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
                    ? 'text-red-400 bg-red-400/20 border border-red-400/30' :'text-muted-foreground hover:text-red-400 hover:bg-red-400/10'
                }`}
              >
                <Icon name={isLiked ? "Heart" : "Heart"} size={20} className={isLiked ? "fill-current" : ""} />
                <span className="font-medium">{jokeOfTheDay?.likes?.toLocaleString()}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg comedy-timing hover-lift ${
                  isBookmarked 
                    ? 'text-primary bg-primary/20 border border-primary/30' :'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
              >
                <Icon name="Bookmark" size={20} className={isBookmarked ? "fill-current" : ""} />
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
              <Button variant="outline" iconName="ExternalLink" iconPosition="right">
                View Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation to more jokes */}
        <div className="text-center mt-12">
          <Link to="/category-explorer">
            <Button variant="default" size="lg" iconName="ArrowRight" iconPosition="right">
              Explore More Jokes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JokeOfTheDay;