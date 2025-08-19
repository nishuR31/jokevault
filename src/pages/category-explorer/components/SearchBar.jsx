import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onVoiceSearch, suggestions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      const filtered = suggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered?.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [searchTerm, suggestions]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    inputRef?.current?.focus();
  };

  const handleVoiceClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        setSearchTerm(transcript);
        onSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition?.start();
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    onSearch('');
    inputRef?.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={suggestionsRef}>
      <div className="relative glassmorphic-card rounded-xl p-1">
        <div className="flex items-center space-x-3 px-4 py-3">
          <Icon name="Search" size={20} className="text-muted-foreground" />
          
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search categories, tags, or keywords..."
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none font-inter"
          />

          <div className="flex items-center space-x-2">
            {searchTerm && (
              <button
                onClick={handleClear}
                className="p-1 rounded-full hover:bg-muted/20 comedy-timing"
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            )}

            <button
              onClick={handleVoiceClick}
              disabled={isListening}
              className={`p-2 rounded-lg comedy-timing ${
                isListening
                  ? 'bg-primary text-white pulse-glow' :'hover:bg-muted/20 text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={isListening ? "Mic" : "Mic"} 
                size={18} 
                className={isListening ? "animate-pulse" : ""} 
              />
            </button>

            <Button
              variant="default"
              size="sm"
              iconName="Shuffle"
              iconPosition="left"
              onClick={() => onSearch('surprise-me')}
              className="hidden sm:flex"
            >
              Surprise Me
            </Button>
          </div>
        </div>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glassmorphic-card rounded-xl border border-border z-50 max-h-60 overflow-y-auto">
          <div className="py-2">
            {filteredSuggestions?.slice(0, 8)?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted/20 comedy-timing"
              >
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-foreground font-inter">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Voice Search Indicator */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 glassmorphic-card rounded-xl border border-primary p-4 z-50">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-foreground font-inter">Listening...</span>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;