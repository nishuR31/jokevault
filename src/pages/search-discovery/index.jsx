import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import TrendingSection from './components/TrendingSection';
import SerendipityMode from './components/SerendipityMode';

const SearchDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSerendipity, setShowSerendipity] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    mood: 'any',
    freshness: 'any',
    length: 'any',
    sfw: false,
    trending: false,
    recent: false
  });

  // Mock search results data
  const mockResults = [
    {
      id: 1,
      content: "Why don't scientists trust atoms? Because they make up everything! This classic joke plays on the double meaning of 'make up' - both to compose something and to fabricate stories.",
      relevanceScore: 95,
      rating: 4.8,
      tags: ['science', 'wordplay', 'classic'],
      views: '12.3k',
      likes: '2.1k',
      shares: '456',
      timeAgo: '2 hours ago',
      isSaved: false
    },
    {
      id: 2,
      content: "I told my wife she was drawing her eyebrows too high. She looked surprised. The humor comes from the visual pun - when eyebrows are drawn too high, they naturally create a surprised expression.",
      relevanceScore: 88,
      rating: 4.6,
      tags: ['marriage', 'observational', 'visual'],
      views: '8.7k',
      likes: '1.5k',
      shares: '234',
      timeAgo: '4 hours ago',
      isSaved: true
    },
    {
      id: 3,
      content: "Why did the scarecrow win an award? He was outstanding in his field! This is a perfect example of a pun that works on multiple levels - both literally and figuratively.",
      relevanceScore: 82,
      rating: 4.7,
      tags: ['puns', 'farming', 'awards'],
      views: '15.2k',
      likes: '2.8k',
      shares: '567',
      timeAgo: '6 hours ago',
      isSaved: false
    },
    {
      id: 4,
      content: "I'm reading a book about anti-gravity. It's impossible to put down! The joke works because 'put down' has both a literal meaning (to place something down) and a figurative one (to stop reading).",
      relevanceScore: 79,
      rating: 4.5,
      tags: ['books', 'science', 'wordplay'],
      views: '6.9k',
      likes: '1.2k',
      shares: '189',
      timeAgo: '8 hours ago',
      isSaved: false
    },
    {
      id: 5,
      content: "Why don't eggs tell jokes? They'd crack each other up! This joke combines the physical property of eggs (cracking) with the expression 'crack up' meaning to laugh hysterically.",
      relevanceScore: 75,
      rating: 4.4,
      tags: ['food', 'wordplay', 'eggs'],
      views: '9.1k',
      likes: '1.7k',
      shares: '298',
      timeAgo: '12 hours ago',
      isSaved: true
    },
    {
      id: 6,
      content: "I used to hate facial hair, but then it grew on me. This joke plays with the literal meaning of hair growing and the figurative expression 'it grew on me' meaning to gradually like something.",
      relevanceScore: 71,
      rating: 4.3,
      tags: ['personal', 'wordplay', 'growth'],
      views: '5.4k',
      likes: '987',
      shares: '156',
      timeAgo: '1 day ago',
      isSaved: false
    }
  ];

  const handleSearch = (query) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Simulate API call
    setTimeout(() => {
      if (query?.trim()) {
        // Filter results based on query and filters
        let filteredResults = mockResults?.filter(joke => 
          joke?.content?.toLowerCase()?.includes(query?.toLowerCase()) ||
          joke?.tags?.some(tag => tag?.toLowerCase()?.includes(query?.toLowerCase()))
        );

        // Apply additional filters
        if (filters?.category !== 'all') {
          filteredResults = filteredResults?.filter(joke => 
            joke?.tags?.includes(filters?.category?.replace('-', ''))
          );
        }

        if (filters?.trending) {
          filteredResults = filteredResults?.filter(joke => joke?.views?.includes('k'));
        }

        if (filters?.recent) {
          filteredResults = filteredResults?.filter(joke => 
            joke?.timeAgo?.includes('hour') || joke?.timeAgo?.includes('minutes')
          );
        }

        setSearchResults(filteredResults);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleVoiceSearch = () => {
    // Simulate voice search
    setTimeout(() => {
      const voiceQuery = "programming jokes";
      setSearchQuery(voiceQuery);
      handleSearch(voiceQuery);
    }, 3000);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  const handleTrendingSearch = (term) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  const handleSaveJoke = (jokeId) => {
    setSearchResults(prev => 
      prev?.map(joke => 
        joke?.id === jokeId ? { ...joke, isSaved: !joke?.isSaved } : joke
      )
    );
  };

  const handleShareJoke = (jokeId) => {
    const joke = searchResults?.find(j => j?.id === jokeId);
    if (joke && navigator.share) {
      navigator.share({
        title: 'Check out this joke!',
        text: joke?.content,
        url: window.location?.href
      });
    }
  };

  const handleSerendipityMode = () => {
    setShowSerendipity(true);
  };

  const handleJokeFound = (joke) => {
    // Handle the joke found in serendipity mode
    console.log('Joke found:', joke);
  };

  // Load initial trending content
  useEffect(() => {
    // Simulate loading trending content
    if (!searchQuery) {
      setSearchResults([]);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Search & Discovery - JokeVault</title>
        <meta name="description" content="Discover the perfect joke with our advanced search and AI-powered recommendations. Find humor that matches your mood and style." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4 text-shadow-glow">
                Discover Your Perfect
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Joke</span>
              </h1>
              <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
                Advanced search with AI-powered recommendations, mood-based discovery, and serendipitous humor exploration
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar
                onSearch={handleSearch}
                onVoiceSearch={handleVoiceSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {/* Search Filters */}
            <div className="mb-8">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onSerendipityMode={handleSerendipityMode}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <SearchResults
                  results={searchResults}
                  isLoading={isLoading}
                  searchQuery={searchQuery}
                  onSaveJoke={handleSaveJoke}
                  onShareJoke={handleShareJoke}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <TrendingSection onTrendingSearch={handleTrendingSearch} />
              </div>
            </div>
          </div>
        </main>

        {/* Serendipity Mode Modal */}
        <SerendipityMode
          isActive={showSerendipity}
          onClose={() => setShowSerendipity(false)}
          onJokeFound={handleJokeFound}
        />
      </div>
    </>
  );
};

export default SearchDiscovery;