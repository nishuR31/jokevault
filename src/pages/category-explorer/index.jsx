import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CategoryCard from './components/CategoryCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import FeaturedCollections from './components/FeaturedCollections';
import SurpriseWheel from './components/SurpriseWheel';
import BreadcrumbNav from './components/BreadcrumbNav';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CategoryExplorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSurpriseWheel, setShowSurpriseWheel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    moods: [],
    length: '',
    sortBy: 'popular',
    contentRating: 'all'
  });

  // Mock categories data
  const mockCategories = [
    {
      id: 1,
      name: "Dad Jokes",
      slug: "dad-jokes",
      jokeCount: 234,
      mood: "wholesome",
      previewJoke: "Why don't scientists trust atoms? Because they make up everything!",
      rating: 4.8,
      avgReadTime: "30 sec",
      trending: true,
      isNSFW: false
    },
    {
      id: 2,
      name: "Programming Humor",
      slug: "programming-humor",
      jokeCount: 189,
      mood: "clever",
      previewJoke: "There are only 10 types of people in the world: those who understand binary and those who don't.",
      rating: 4.6,
      avgReadTime: "45 sec",
      trending: false,
      isNSFW: false
    },
    {
      id: 3,
      name: "Office Comedy",
      slug: "office-comedy",
      jokeCount: 156,
      mood: "witty",
      previewJoke: "I told my boss three companies were after me and I needed a raise to stay. He asked which companies. I said gas, electric, and cable.",
      rating: 4.7,
      avgReadTime: "1 min",
      trending: true,
      isNSFW: false
    },
    {
      id: 4,
      name: "One-Liners",
      slug: "one-liners",
      jokeCount: 298,
      mood: "funny",
      previewJoke: "I haven't slept for ten days, because that would be too long.",
      rating: 4.5,
      avgReadTime: "15 sec",
      trending: false,
      isNSFW: false
    },
    {
      id: 5,
      name: "Puns & Wordplay",
      slug: "puns-wordplay",
      jokeCount: 167,
      mood: "clever",
      previewJoke: "I wondered why the baseball kept getting bigger. Then it hit me.",
      rating: 4.4,
      avgReadTime: "20 sec",
      trending: false,
      isNSFW: false
    },
    {
      id: 6,
      name: "Dark Humor",
      slug: "dark-humor",
      jokeCount: 142,
      mood: "dark",
      previewJoke: "I have a joke about death, but it's a killer.",
      rating: 4.3,
      avgReadTime: "35 sec",
      trending: false,
      isNSFW: true
    },
    {
      id: 7,
      name: "Animal Jokes",
      slug: "animal-jokes",
      jokeCount: 203,
      mood: "wholesome",
      previewJoke: "What do you call a sleeping bull? A bulldozer!",
      rating: 4.6,
      avgReadTime: "25 sec",
      trending: true,
      isNSFW: false
    },
    {
      id: 8,
      name: "Food Humor",
      slug: "food-humor",
      jokeCount: 178,
      mood: "silly",
      previewJoke: "Why did the scarecrow win an award? He was outstanding in his field... of corn!",
      rating: 4.5,
      avgReadTime: "30 sec",
      trending: false,
      isNSFW: false
    },
    {
      id: 9,
      name: "Travel Comedy",
      slug: "travel-comedy",
      jokeCount: 134,
      mood: "witty",
      previewJoke: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      rating: 4.2,
      avgReadTime: "40 sec",
      trending: false,
      isNSFW: false
    },
    {
      id: 10,
      name: "Relationship Humor",
      slug: "relationship-humor",
      jokeCount: 221,
      mood: "sarcastic",
      previewJoke: "My wife told me to stop singing 'Wonderwall.' I said maybe...",
      rating: 4.4,
      avgReadTime: "35 sec",
      trending: true,
      isNSFW: false
    },
    {
      id: 11,
      name: "Tech Fails",
      slug: "tech-fails",
      jokeCount: 167,
      mood: "funny",
      previewJoke: "Why do programmers prefer dark mode? Because light attracts bugs!",
      rating: 4.7,
      avgReadTime: "25 sec",
      trending: false,
      isNSFW: false
    },
    {
      id: 12,
      name: "Random Absurd",
      slug: "random-absurd",
      jokeCount: 189,
      mood: "random",
      previewJoke: "I bought the world's worst thesaurus yesterday. Not only is it terrible, it's terrible.",
      rating: 4.3,
      avgReadTime: "30 sec",
      trending: false,
      isNSFW: false
    }
  ];

  // Search suggestions
  const searchSuggestions = [
    "dad jokes", "programming", "office humor", "one-liners", "puns", "wordplay",
    "dark humor", "animal jokes", "food humor", "travel", "relationships", "tech",
    "funny", "witty", "clever", "wholesome", "silly", "sarcastic", "random"
  ];

  // Filter categories based on current filters and search
  const getFilteredCategories = () => {
    let filtered = [...mockCategories];

    // Search filter
    if (searchTerm && searchTerm !== 'surprise-me') {
      filtered = filtered?.filter(category =>
        category?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        category?.mood?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        category?.previewJoke?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Mood filter
    if (filters?.moods?.length > 0) {
      filtered = filtered?.filter(category =>
        filters?.moods?.includes(category?.mood)
      );
    }

    // Content rating filter
    if (filters?.contentRating === 'sfw') {
      filtered = filtered?.filter(category => !category?.isNSFW);
    } else if (filters?.contentRating === 'nsfw') {
      filtered = filtered?.filter(category => category?.isNSFW);
    }

    // Length filter (mock implementation)
    if (filters?.length === 'quick') {
      filtered = filtered?.filter(category => category?.avgReadTime?.includes('15') || category?.avgReadTime?.includes('20'));
    } else if (filters?.length === 'medium') {
      filtered = filtered?.filter(category => category?.avgReadTime?.includes('30') || category?.avgReadTime?.includes('45'));
    } else if (filters?.length === 'long') {
      filtered = filtered?.filter(category => category?.avgReadTime?.includes('1 min'));
    }

    // Sort filter
    switch (filters?.sortBy) {
      case 'trending':
        filtered = filtered?.sort((a, b) => b?.trending - a?.trending);
        break;
      case 'popular':
        filtered = filtered?.sort((a, b) => b?.jokeCount - a?.jokeCount);
        break;
      case 'newest':
        filtered = filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'highest-rated':
        filtered = filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredCategories = getFilteredCategories();

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === 'surprise-me') {
      setShowSurpriseWheel(true);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      moods: [],
      length: '',
      sortBy: 'popular',
      contentRating: 'all'
    });
    setSearchTerm('');
  };

  const handleCategorySelect = (category) => {
    setShowSurpriseWheel(false);
    // Navigate to category or perform action
    window.location.href = `/joke-detail-page?category=${category?.slug}`;
  };

  const currentCategory = searchParams?.get('category');

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [filters, searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNav currentCategory={currentCategory} filters={filters} />

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-foreground mb-4 text-shadow-glow">
              Explore Comedy Universe
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover your perfect comedy match through our curated collection of joke categories. 
              From wholesome dad jokes to clever wordplay, find humor that speaks to your soul.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              suggestions={searchSuggestions}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />

              {/* Surprise Wheel - Desktop */}
              <div className="hidden lg:block mt-8">
                <SurpriseWheel
                  categories={mockCategories}
                  onCategorySelect={handleCategorySelect}
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-poppins font-semibold text-xl text-foreground">
                    {searchTerm ? `Search Results for "${searchTerm}"` : 'All Categories'}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {filteredCategories?.length} categories found
                  </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Grid3X3"
                    className="hidden sm:flex"
                  >
                    Grid
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="List"
                    className="hidden sm:flex"
                  >
                    List
                  </Button>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {[...Array(6)]?.map((_, index) => (
                    <div key={index} className="glassmorphic-card rounded-xl p-6 animate-pulse">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-muted/20 rounded-lg"></div>
                          <div>
                            <div className="w-24 h-4 bg-muted/20 rounded mb-2"></div>
                            <div className="w-16 h-3 bg-muted/20 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="w-full h-3 bg-muted/20 rounded"></div>
                        <div className="w-3/4 h-3 bg-muted/20 rounded"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-20 h-3 bg-muted/20 rounded"></div>
                        <div className="w-16 h-3 bg-muted/20 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Categories Grid */}
              {!loading && (
                <>
                  {filteredCategories?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                      {filteredCategories?.map((category, index) => (
                        <CategoryCard
                          key={category?.id}
                          category={category}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 mx-auto mb-6 glassmorphic rounded-full flex items-center justify-center">
                        <Icon name="Search" size={32} className="text-muted-foreground" />
                      </div>
                      <h3 className="font-poppins font-semibold text-xl text-foreground mb-2">
                        No categories found
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Try adjusting your filters or search terms to find more results.
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Surprise Wheel Modal - Mobile */}
              {showSurpriseWheel && (
                <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="w-full max-w-md">
                    <div className="flex justify-end mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSurpriseWheel(false)}
                        iconName="X"
                      />
                    </div>
                    <SurpriseWheel
                      categories={mockCategories}
                      onCategorySelect={handleCategorySelect}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Collections */}
          <div className="mt-16">
            <FeaturedCollections />
          </div>

          {/* Load More Button */}
          {!loading && filteredCategories?.length > 0 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                iconName="ChevronDown"
                iconPosition="right"
                className="hover-lift"
              >
                Load More Categories
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} JokeVault. All rights reserved.</p>
            <p className="text-sm mt-2">
              Spreading laughter, one joke at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryExplorer;