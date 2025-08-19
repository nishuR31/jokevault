import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ selectedMood }) => {
  const getRecommendationsByMood = (mood) => {
    const allRecommendations = {
      all: [
        {
          id: 1,
          text: "I haven't slept for ten days, because that would be too long.",
          category: "One-liners",
          author: "Mitch Hedberg",
          likes: 3421,
          difficulty: "Easy",
          readTime: "5 sec"
        },
        {
          id: 2,
          text: "The early bird might get the worm, but the second mouse gets the cheese.",
          category: "Wisdom",
          author: "Anonymous",
          likes: 2876,
          difficulty: "Medium",
          readTime: "8 sec"
        },
        {
          id: 3,
          text: "I told my cat a joke about dogs. He didn't find it a-mew-sing.",
          category: "Puns",
          author: "Comedy Central",
          likes: 1654,
          difficulty: "Easy",
          readTime: "6 sec"
        }
      ],
      happy: [
        {
          id: 4,
          text: "Why don't eggs tell jokes? They'd crack each other up!",
          category: "Feel-good",
          author: "Dad Jokes Daily",
          likes: 4521,
          difficulty: "Easy",
          readTime: "4 sec"
        },
        {
          id: 5,
          text: "I\'m on a seafood diet. I see food and I eat it!",
          category: "Food Humor",
          author: "Kitchen Comedy",
          likes: 3287,
          difficulty: "Easy",
          readTime: "5 sec"
        }
      ],
      witty: [
        {
          id: 6,
          text: "I'm not arguing, I'm just explaining why I'm right.",
          category: "Clever",
          author: "Wit & Wisdom",
          likes: 5643,
          difficulty: "Medium",
          readTime: "7 sec"
        },
        {
          id: 7,
          text: "The difference between stupidity and genius is that genius has its limits.",
          category: "Intelligence",
          author: "Einstein (maybe)",
          likes: 7821,
          difficulty: "Hard",
          readTime: "10 sec"
        }
      ],
      sarcastic: [
        {
          id: 8,
          text: "I love deadlines. I like the whooshing sound they make as they fly by.",
          category: "Work Life",
          author: "Douglas Adams",
          likes: 6543,
          difficulty: "Medium",
          readTime: "8 sec"
        },
        {
          id: 9,
          text: "I'm not lazy, I'm just on energy-saving mode.",
          category: "Self-deprecating",
          author: "Modern Millennial",
          likes: 4321,
          difficulty: "Easy",
          readTime: "6 sec"
        }
      ],
      clean: [
        {
          id: 10,
          text: "What do you call a bear with no teeth? A gummy bear!",
          category: "Family Fun",
          author: "Kids Comedy Club",
          likes: 2987,
          difficulty: "Easy",
          readTime: "4 sec"
        },
        {
          id: 11,
          text: "Why did the math book look so sad? Because it had too many problems!",
          category: "School Humor",
          author: "Teacher\'s Lounge",
          likes: 3654,
          difficulty: "Easy",
          readTime: "6 sec"
        }
      ]
    };

    return allRecommendations?.[selectedMood] || allRecommendations?.all;
  };

  const recommendations = getRecommendationsByMood(selectedMood);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Hard': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-primary bg-primary/20 border-primary/30';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
              Curated Just
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> For You </span>
            </h2>
            <p className="font-inter text-lg text-muted-foreground">
              Personalized recommendations based on your humor preferences and mood selection.
            </p>
          </div>
          <Link to="/search-discovery">
            <Button variant="outline" iconName="Search" iconPosition="right">
              Discover More
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations?.map((joke, index) => (
            <div
              key={joke?.id}
              className="glassmorphic-card rounded-2xl p-6 hover-lift comedy-timing border border-primary/10 hover:border-primary/30 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                    {joke?.category}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(joke?.difficulty)}`}>
                    {joke?.difficulty}
                  </span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 comedy-timing p-2 rounded-lg hover:bg-muted/50">
                  <Icon name="Bookmark" size={16} className="text-muted-foreground hover:text-primary" />
                </button>
              </div>

              {/* Joke Content */}
              <div className="mb-6">
                <p className="font-inter text-foreground leading-relaxed mb-3">
                  "{joke?.text}"
                </p>
                <p className="font-inter text-sm text-muted-foreground">
                  — {joke?.author}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1 text-sm">
                    <Icon name="Heart" size={14} />
                    {joke?.likes?.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Icon name="Clock" size={14} />
                    {joke?.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted/50 comedy-timing">
                    <Icon name="Share2" size={16} className="text-muted-foreground hover:text-primary" />
                  </button>
                  <Link to="/joke-detail-page">
                    <button className="p-2 rounded-lg hover:bg-muted/50 comedy-timing">
                      <Icon name="ExternalLink" size={16} className="text-muted-foreground hover:text-primary" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Link to="/category-explorer">
            <Button variant="outline" size="lg" iconName="RefreshCw" iconPosition="left">
              Load More Recommendations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;