import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MoodSelector = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState('all');

  const moods = [
    {
      id: 'all',
      name: 'All Moods',
      icon: 'Sparkles',
      color: 'from-primary to-secondary',
      description: 'Every type of humor'
    },
    {
      id: 'happy',
      name: 'Happy',
      icon: 'Smile',
      color: 'from-yellow-400 to-orange-500',
      description: 'Uplifting & cheerful'
    },
    {
      id: 'witty',
      name: 'Witty',
      icon: 'Lightbulb',
      color: 'from-blue-400 to-purple-500',
      description: 'Clever & intelligent'
    },
    {
      id: 'sarcastic',
      name: 'Sarcastic',
      icon: 'Zap',
      color: 'from-red-400 to-pink-500',
      description: 'Sharp & satirical'
    },
    {
      id: 'clean',
      name: 'Clean Fun',
      icon: 'Heart',
      color: 'from-green-400 to-teal-500',
      description: 'Family-friendly humor'
    }
  ];

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    onMoodSelect(moodId);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
            What's Your
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Mood </span>
            Today?
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover jokes that match your current vibe. Our mood-based discovery helps you find the perfect laugh for any moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {moods?.map((mood) => (
            <button
              key={mood?.id}
              onClick={() => handleMoodSelect(mood?.id)}
              className={`glassmorphic-card rounded-2xl p-6 comedy-timing hover-lift group relative overflow-hidden ${
                selectedMood === mood?.id 
                  ? 'ring-2 ring-primary border-primary/50' :'hover:border-primary/30'
              }`}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${mood?.color} opacity-10 group-hover:opacity-20 comedy-timing`}></div>
              
              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${mood?.color} p-4 flex items-center justify-center shadow-lg`}>
                  <Icon name={mood?.icon} size={32} className="text-white" />
                </div>
                
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                  {mood?.name}
                </h3>
                
                <p className="font-inter text-sm text-muted-foreground">
                  {mood?.description}
                </p>

                {selectedMood === mood?.id && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoodSelector;