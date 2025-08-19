import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

  const trendingJokes = [
    {
      id: 1,
      text: "Why don't scientists trust atoms? Because they make up everything!",
      category: "Science",
      likes: 1247,
      shares: 89
    },
    {
      id: 2,
      text: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      category: "Observational",
      likes: 2156,
      shares: 134
    },
    {
      id: 3,
      text: "Why did the scarecrow win an award? He was outstanding in his field!",
      category: "Puns",
      likes: 987,
      shares: 67
    },
    {
      id: 4,
      text: "I'm reading a book about anti-gravity. It's impossible to put down!",
      category: "Wordplay",
      likes: 1543,
      shares: 92
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJokeIndex((prev) => (prev + 1) % trendingJokes?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingJokes?.length]);

  const currentJoke = trendingJokes?.[currentJokeIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Hero Content */}
        <div className="glassmorphic-card rounded-3xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto stagger-fade-in">
          <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 text-shadow-glow">
            Where Great
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Humor </span>
            Lives
          </h1>
          
          <p className="font-inter text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover premium comedy content curated for your taste. From witty one-liners to clever observations, 
            find your perfect laugh in our sophisticated humor vault.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/category-explorer">
              <Button variant="default" size="lg" className="pulse-glow" iconName="Compass" iconPosition="left">
                Explore Comedy
              </Button>
            </Link>
            <Link to="/authentication-portal">
              <Button variant="outline" size="lg" iconName="User" iconPosition="left">
                Join Community
              </Button>
            </Link>
          </div>

          {/* Trending Jokes Carousel */}
          <div className="glassmorphic rounded-2xl p-6 md:p-8 border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-poppins font-semibold text-xl text-foreground flex items-center gap-2">
                <Icon name="TrendingUp" size={24} className="text-primary" />
                Trending Now
              </h3>
              <div className="flex gap-2">
                {trendingJokes?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentJokeIndex(index)}
                    className={`w-2 h-2 rounded-full comedy-timing ${
                      index === currentJokeIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative min-h-[120px] flex items-center">
              <div className="w-full comedy-timing">
                <p className="font-inter text-lg md:text-xl text-foreground mb-4 leading-relaxed">
                  "{currentJoke?.text}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30">
                    {currentJoke?.category}
                  </span>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Heart" size={16} />
                      {currentJoke?.likes?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Share2" size={16} />
                      {currentJoke?.shares}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;