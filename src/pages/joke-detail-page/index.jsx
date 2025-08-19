import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import JokeCard from './components/JokeCard';
import CommentSection from './components/CommentSection';
import RelatedJokes from './components/RelatedJokes';
import JokeSidebar from './components/JokeSidebar';
import NavigationControls from './components/NavigationControls';

const JokeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentJoke, setCurrentJoke] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedJokes, setRelatedJokes] = useState([]);
  const [fontSize, setFontSize] = useState('default');
  const [isLoading, setIsLoading] = useState(true);

  // Mock joke data
  const mockJoke = {
    id: parseInt(id) || 1,
    title: "The Programming Paradox",
    content: `A programmer's wife asks him to go to the store and buy a gallon of milk, and if they have eggs, buy a dozen.\n\nThe programmer comes home with 12 gallons of milk.\n\nWhen his wife asks why, he explains: "They had eggs, so I bought a dozen... gallons of milk."\n\nThis classic joke perfectly illustrates the literal thinking that programmers often apply to everyday situations. The ambiguity in natural language that humans easily navigate can trip up those trained to think in precise, logical terms.\n\nIt's a gentle reminder that context and common sense are just as important as logical precision in communication.`,
    category: "Programming",
    contentRating: "SFW",
    readingTime: 2,
    views: 15420,
    popularityScore: 87,
    averageRating: 4.3,
    totalRatings: 1247,
    commentCount: 89,
    bookmarkCount: 342,
    shareCount: 156,
    userRating: 0,
    isBookmarked: false,
    submissionDate: "December 15, 2024",
    tags: ["Programming", "Logic", "Humor", "Tech", "Communication"],
    contributor: {
      id: 1,
      name: "CodeMaster42",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      reputation: 8540,
      totalJokes: 127
    }
  };

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      author: "TechLaugher",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "This is so true! I've made similar mistakes in real life because of my programming mindset. The literal interpretation trap is real!",
      timestamp: "2 hours ago",
      likes: 23,
      isLiked: false,
      reputation: 1250,
      replies: [
        {
          id: 11,
          author: "LogicLoop",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          content: "Same here! My family has learned to be very specific when asking me to do things 😄",
          timestamp: "1 hour ago",
          likes: 8,
          isLiked: true
        }
      ]
    },
    {
      id: 2,
      author: "DebugDiva",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "Classic! This joke never gets old. It perfectly captures the difference between human intuition and programmatic logic.",
      timestamp: "4 hours ago",
      likes: 17,
      isLiked: true,
      reputation: 2100,
      replies: []
    },
    {
      id: 3,
      author: "AlgorithmAnnie",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      content: "I\'m going to use this in my next presentation about the importance of clear requirements! Thanks for sharing.",
      timestamp: "6 hours ago",
      likes: 31,
      isLiked: false,
      reputation: 3400,
      replies: []
    }
  ];

  // Mock related jokes
  const mockRelatedJokes = [
    {
      id: 2,
      title: "The Infinite Loop Café",
      preview: "A programmer walks into a café and orders a coffee. The barista asks, 'Would you like sugar?' The programmer replies, 'Yes.' The barista keeps adding sugar...",
      category: "Programming",
      contentRating: "SFW",
      readingTime: 1,
      rating: 4.1,
      views: "8.2K",
      tags: ["Programming", "Logic", "Café"]
    },
    {
      id: 3,
      title: "Binary Counting Blues",
      preview: "There are only 10 types of people in the world: those who understand binary and those who don't. And those who weren't expecting a ternary joke...",
      category: "Programming",
      contentRating: "SFW",
      readingTime: 1,
      rating: 4.5,
      views: "12.1K",
      tags: ["Binary", "Math", "Programming"]
    },
    {
      id: 4,
      title: "The Debugging Detective",
      preview: "A QA engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 99999999999 beers. Orders a lizard. Orders -1 beers...",
      category: "Programming",
      contentRating: "SFW",
      readingTime: 2,
      rating: 4.7,
      views: "18.5K",
      tags: ["QA", "Testing", "Programming"]
    },
    {
      id: 5,
      title: "Stack Overflow Syndrome",
      preview: "How many programmers does it take to change a light bulb? None. That's a hardware problem. But first, let me check Stack Overflow...",
      category: "Programming",
      contentRating: "SFW",
      readingTime: 1,
      rating: 4.2,
      views: "9.8K",
      tags: ["Hardware", "Programming", "Stack Overflow"]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setCurrentJoke(mockJoke);
      setComments(mockComments);
      setRelatedJokes(mockRelatedJokes);
      setIsLoading(false);
    }, 500);
  }, [id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e?.key === 'ArrowRight') {
        handleNext();
      } else if (e?.key === 'r' || e?.key === 'R') {
        handleRandom();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleRate = (rating) => {
    console.log('Rating joke:', rating);
    // Update joke rating logic here
  };

  const handleBookmark = (isBookmarked) => {
    console.log('Bookmark status:', isBookmarked);
    // Update bookmark logic here
  };

  const handleShare = (platform) => {
    const jokeUrl = window.location?.href;
    const jokeText = `Check out this hilarious joke: "${currentJoke?.title}"`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeText)}&url=${encodeURIComponent(jokeUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jokeUrl)}`);
        break;
      case 'copy':
        navigator.clipboard?.writeText(jokeUrl);
        // Show toast notification
        break;
      default:
        break;
    }
  };

  const handleAddComment = (content) => {
    const newComment = {
      id: comments?.length + 1,
      author: "You",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      content,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      reputation: 150,
      replies: []
    };
    setComments([newComment, ...comments]);
  };

  const handleReplyComment = (commentId, content) => {
    const newReply = {
      id: Date.now(),
      author: "You",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      content,
      timestamp: "Just now",
      likes: 0,
      isLiked: false
    };

    setComments(comments?.map(comment => 
      comment?.id === commentId 
        ? { ...comment, replies: [...(comment?.replies || []), newReply] }
        : comment
    ));
  };

  const handleLikeComment = (commentId) => {
    setComments(comments?.map(comment => 
      comment?.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment?.isLiked,
            likes: comment?.isLiked ? comment?.likes - 1 : comment?.likes + 1
          }
        : comment
    ));
  };

  const handleJokeClick = (jokeId) => {
    navigate(`/joke-detail-page/${jokeId}`);
  };

  const handleTextToSpeech = (shouldPlay) => {
    if (shouldPlay && currentJoke) {
      const utterance = new SpeechSynthesisUtterance(currentJoke.content);
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    // Apply font size changes to the joke content
  };

  const handleReport = () => {
    console.log('Reporting joke:', currentJoke?.id);
    // Show report modal or navigate to report page
  };

  const handlePrevious = () => {
    const prevId = Math.max(1, currentJoke?.id - 1);
    navigate(`/joke-detail-page/${prevId}`);
  };

  const handleNext = () => {
    const nextId = currentJoke?.id + 1;
    navigate(`/joke-detail-page/${nextId}`);
  };

  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    navigate(`/joke-detail-page/${randomId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="glassmorphic-card rounded-2xl p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="font-inter text-muted-foreground">Loading joke...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentJoke) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="glassmorphic-card rounded-2xl p-8 text-center">
                <p className="font-inter text-foreground mb-4">Joke not found</p>
                <button
                  onClick={() => navigate('/homepage')}
                  className="text-primary hover:text-primary/80 font-inter"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Joke Card */}
              <div className={`stagger-fade-in ${fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : ''}`}>
                <JokeCard
                  joke={currentJoke}
                  onRate={handleRate}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                />
              </div>

              {/* Comments Section */}
              <div className="stagger-fade-in" style={{ animationDelay: '0.2s' }}>
                <CommentSection
                  comments={comments}
                  onAddComment={handleAddComment}
                  onReplyComment={handleReplyComment}
                  onLikeComment={handleLikeComment}
                />
              </div>

              {/* Related Jokes */}
              <div className="stagger-fade-in" style={{ animationDelay: '0.4s' }}>
                <RelatedJokes
                  jokes={relatedJokes}
                  onJokeClick={handleJokeClick}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 stagger-fade-in" style={{ animationDelay: '0.6s' }}>
                <JokeSidebar
                  joke={currentJoke}
                  onTextToSpeech={handleTextToSpeech}
                  onFontSizeChange={handleFontSizeChange}
                  onReport={handleReport}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <NavigationControls
        currentJoke={currentJoke}
        previousJoke={currentJoke?.id > 1 ? { id: currentJoke?.id - 1, title: "Previous Joke" } : null}
        nextJoke={{ id: currentJoke?.id + 1, title: "Next Joke" }}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onRandom={handleRandom}
      />
    </div>
  );
};

export default JokeDetailPage;