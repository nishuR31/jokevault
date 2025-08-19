import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MoodSelector from './components/MoodSelector';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import JokeOfTheDay from './components/JokeOfTheDay';
import CommunityStats from './components/CommunityStats';
import Footer from './components/Footer';

const Homepage = () => {
  const [selectedMood, setSelectedMood] = useState('all');

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section with Trending Jokes Carousel */}
        <HeroSection />
        
        {/* Mood-based Discovery Section */}
        <MoodSelector onMoodSelect={handleMoodSelect} />
        
        {/* Personalized Recommendations */}
        <PersonalizedRecommendations selectedMood={selectedMood} />
        
        {/* Joke of the Day Spotlight */}
        <JokeOfTheDay />
        
        {/* Community Stats & Live Activity */}
        <CommunityStats />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;