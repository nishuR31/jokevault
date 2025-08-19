import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import WelcomeCard from './components/WelcomeCard';
import MyVaultSection from './components/MyVaultSection';
import RecommendationsSection from './components/RecommendationsSection';
import ReadingHistorySection from './components/ReadingHistorySection';
import PreferencesSection from './components/PreferencesSection';
import ContributionsSection from './components/ContributionsSection';
import SocialSection from './components/SocialSection';
import QuickActionsPanel from './components/QuickActionsPanel';

const UserDashboard = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [preferences, setPreferences] = useState({
    cleanEdgy: 30,
    shortLong: 60,
    popularNiche: 45,
    simpleComplex: 40,
    dailyJokes: true,
    collectionAlerts: true,
    trendingAlerts: false,
    communityUpdates: true,
    hideNSFW: true,
    hidePolitical: false,
    hideDarkHumor: false,
    verifiedOnly: false,
    largeText: false,
    highContrast: false,
    reduceAnimations: false,
    autoPlayAudio: false
  });

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    streak: 15,
    joinedDate: "2024-01-15",
    isVerified: true
  };

  // Mock stats data
  const statsData = {
    jokesLiked: 1247,
    jokesSaved: 89,
    jokesShared: 156,
    achievements: 12
  };

  // Mock collections data
  const collectionsData = [
    {
      id: 1,
      name: "Dad Jokes",
      count: 45,
      icon: "Smile",
      color: "bg-primary",
      lastUpdated: "2 days ago",
      recentJokes: [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised."
      ]
    },
    {
      id: 2,
      name: "Work Humor",
      count: 23,
      icon: "Briefcase",
      color: "bg-secondary",
      lastUpdated: "1 week ago",
      recentJokes: [
        "I'm not arguing, I'm just explaining why I'm right.",
        "Coffee: because adulting is hard."
      ]
    },
    {
      id: 3,
      name: "Clean Comedy",
      count: 67,
      icon: "Shield",
      color: "bg-success",
      lastUpdated: "3 days ago",
      recentJokes: [
        "What do you call a bear with no teeth? A gummy bear!",
        "Why did the scarecrow win an award? He was outstanding in his field!"
      ]
    }
  ];

  // Mock recommendations data
  const recommendationsData = [
    {
      id: 101,
      content: `Why don't programmers like nature?\nBecause it has too many bugs and not enough features!\n\nPlus, you can't just restart a tree when it stops working.`,
      tags: ["Programming", "Tech", "Clean"],
      rating: 4.7,
      likes: 234,
      matchScore: 92,
      isLiked: false,
      isSaved: false,
      reasonTag: "programming"
    },
    {
      id: 102,
      content: `I told my boss I needed a raise because three companies were after me.\nHe asked which ones.\nI said the gas, electric, and water companies.`,
      tags: ["Work", "Money", "Relatable"],
      rating: 4.5,
      likes: 189,
      matchScore: 88,
      isLiked: true,
      isSaved: false,
      reasonTag: "work humor"
    },
    {
      id: 103,
      content: `My therapist says I have a preoccupation with vengeance.\nWe'll see about that.`,
      tags: ["Dark", "Psychology", "Witty"],
      rating: 4.8,
      likes: 312,
      matchScore: 85,
      isLiked: false,
      isSaved: true,
      reasonTag: "dark humor"
    }
  ];

  // Mock reading history data
  const historyData = [
    {
      id: 201,
      title: "The Ultimate Dad Joke Collection",
      preview: "Why don't scientists trust atoms? Because they make up everything! This classic dad joke never gets old...",
      tags: ["Dad Jokes", "Classic"],
      viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString(),
      views: 1234,
      rating: 4.6
    },
    {
      id: 202,
      title: "Programming Humor for Developers",
      preview: "There are only 10 types of people in the world: those who understand binary and those who don't...",
      tags: ["Programming", "Tech"],
      viewedAt: new Date(Date.now() - 5 * 60 * 60 * 1000)?.toISOString(),
      views: 892,
      rating: 4.8
    },
    {
      id: 203,
      title: "Office Comedy Gold",
      preview: "I'm not saying I hate my job, but if I won the lottery tomorrow, I'd still come in... to quit in person...",
      tags: ["Work", "Office"],
      viewedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)?.toISOString(),
      views: 567,
      rating: 4.4
    },
    {
      id: 204,
      title: "Clean Comedy for All Ages",
      preview: "What do you call a bear with no teeth? A gummy bear! Perfect for family gatherings...",
      tags: ["Clean", "Family"],
      viewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)?.toISOString(),
      views: 445,
      rating: 4.7
    }
  ];

  // Mock contributions data
  const contributionsData = [
    {
      id: 301,
      content: `Why did the developer go broke?\nBecause he used up all his cache!\n\nAnd his savings account had a null pointer exception.`,
      tags: ["Programming", "Tech"],
      status: "approved",
      submittedAt: "2025-01-05T10:30:00Z",
      views: 1456,
      likes: 89,
      shares: 23,
      rating: 4.6
    },
    {
      id: 302,
      content: `I told my wife she was drawing her eyebrows too high.\nShe looked surprised.`,
      tags: ["Marriage", "Classic"],
      status: "pending",
      submittedAt: "2025-01-06T14:15:00Z"
    },
    {
      id: 303,
      content: `Why don't politicians ever get cold?\nBecause they're surrounded by hot air!`,
      tags: ["Political", "Satire"],
      status: "rejected",
      submittedAt: "2025-01-04T09:45:00Z",
      feedback: "Content may be too politically charged for our general audience. Consider a more neutral approach."
    }
  ];

  // Mock social data
  const socialData = {
    following: [
      {
        id: 401,
        name: "Comedy Central",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        jokesCount: 234,
        followersCount: 15600,
        isOnline: true
      },
      {
        id: 402,
        name: "Sarah Mitchell",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        jokesCount: 67,
        followersCount: 892,
        isOnline: false
      },
      {
        id: 403,
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        jokesCount: 123,
        followersCount: 1234,
        isOnline: true
      }
    ],
    followers: [
      {
        id: 501,
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        jokesCount: 45,
        followedAt: "2025-01-01T12:00:00Z",
        isFollowingBack: false,
        isOnline: true
      },
      {
        id: 502,
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        jokesCount: 78,
        followedAt: "2024-12-28T15:30:00Z",
        isFollowingBack: true,
        isOnline: false
      }
    ],
    activities: [
      {
        id: 601,
        type: "like",
        user: {
          name: "Sarah Mitchell",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        description: "liked your joke about programming",
        jokePreview: "Why did the developer go broke? Because he used up all his cache!",
        jokeId: 301,
        timestamp: "2025-01-07T10:15:00Z"
      },
      {
        id: 602,
        type: "follow",
        user: {
          name: "Mike Rodriguez",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        description: "started following you",
        timestamp: "2025-01-07T08:30:00Z"
      },
      {
        id: 603,
        type: "share",
        user: {
          name: "Emma Thompson",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        },
        description: "shared your joke collection",
        jokePreview: "Dad Jokes Collection - 45 hilarious jokes",
        timestamp: "2025-01-06T16:45:00Z"
      }
    ]
  };

  const handlePreferencesUpdate = (newPreferences) => {
    setPreferences(newPreferences);
    // Here you would typically save to backend
    console.log('Preferences updated:', newPreferences);
  };

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    // Here you would typically save theme preference
    console.log('Theme changed to:', newTheme);
  };

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  return (
    <>
      <Helmet>
        <title>User Dashboard - JokeVault</title>
        <meta name="description" content="Your personalized comedy dashboard with saved jokes, preferences, and community features." />
        <meta name="keywords" content="user dashboard, comedy preferences, joke collections, humor settings" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <WelcomeCard user={userData} stats={statsData} />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <MyVaultSection collections={collectionsData} />
                <RecommendationsSection recommendations={recommendationsData} />
                <ReadingHistorySection history={historyData} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <PreferencesSection 
                  preferences={preferences} 
                  onPreferencesUpdate={handlePreferencesUpdate} 
                />
                <ContributionsSection contributions={contributionsData} />
                <SocialSection socialData={socialData} />
              </div>
            </div>
          </div>
        </main>

        {/* Quick Actions Panel */}
        <QuickActionsPanel 
          onThemeToggle={handleThemeToggle}
          currentTheme={currentTheme}
        />
      </div>
    </>
  );
};

export default UserDashboard;