import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onVoiceSearch, searchQuery, setSearchQuery }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const mockSuggestions = [
    "dad jokes about work",
    "funny programming jokes",
    "clean office humor",
    "weekend jokes",
    "coffee jokes",
    "monday motivation jokes",
    "tech support humor",
    "meeting jokes"
  ];

  useEffect(() => {
    if (searchQuery?.length > 2) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    onVoiceSearch();
    setTimeout(() => setIsVoiceActive(false), 3000);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glassmorphic-card rounded-2xl p-2 border border-border">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                placeholder="Search for jokes, tags, or topics..."
                className="w-full bg-transparent text-foreground placeholder-muted-foreground text-lg font-inter px-4 py-3 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleVoiceSearch}
                className={`rounded-xl ${isVoiceActive ? 'bg-primary/20 text-primary pulse-glow' : ''}`}
              >
                <Icon name={isVoiceActive ? "MicOff" : "Mic"} size={20} />
              </Button>
              
              <Button
                type="submit"
                variant="default"
                size="icon"
                className="rounded-xl"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glassmorphic-card rounded-xl border border-border z-50">
          <div className="py-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-muted/50 comedy-timing flex items-center space-x-3"
              >
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-foreground font-inter">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Voice Search Indicator */}
      {isVoiceActive && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 glassmorphic-card rounded-xl px-6 py-4 border border-primary/30">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-foreground font-inter">Listening...</span>
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse"></div>
              <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;