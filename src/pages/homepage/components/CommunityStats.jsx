import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = () => {
  const [stats, setStats] = useState({
    laughsToday: 45672,
    newJokes: 127,
    activeUsers: 8934,
    totalJokes: 125847
  });

  const [animatedStats, setAnimatedStats] = useState({
    laughsToday: 0,
    newJokes: 0,
    activeUsers: 0,
    totalJokes: 0
  });

  // Animate numbers on component mount
  useEffect(() => {
    const animateNumber = (key, target, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, 16);
    };

    // Stagger the animations
    setTimeout(() => animateNumber('laughsToday', stats?.laughsToday), 200);
    setTimeout(() => animateNumber('newJokes', stats?.newJokes), 400);
    setTimeout(() => animateNumber('activeUsers', stats?.activeUsers), 600);
    setTimeout(() => animateNumber('totalJokes', stats?.totalJokes), 800);
  }, [stats]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        laughsToday: prev?.laughsToday + Math.floor(Math.random() * 3) + 1,
        activeUsers: prev?.activeUsers + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      key: 'laughsToday',
      label: 'Laughs Shared Today',
      icon: 'Heart',
      color: 'text-red-400',
      bgColor: 'bg-red-400/20',
      borderColor: 'border-red-400/30',
      suffix: ''
    },
    {
      key: 'newJokes',
      label: 'New Jokes Added',
      icon: 'Plus',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
      borderColor: 'border-green-400/30',
      suffix: ' today'
    },
    {
      key: 'activeUsers',
      label: 'Comedy Lovers Online',
      icon: 'Users',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      borderColor: 'border-blue-400/30',
      suffix: ' now'
    },
    {
      key: 'totalJokes',
      label: 'Total Jokes in Vault',
      icon: 'Archive',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
      borderColor: 'border-purple-400/30',
      suffix: ''
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toLocaleString();
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
            Our Comedy
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Community </span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of comedy enthusiasts sharing laughs, discovering new humor, and building connections through the universal language of laughter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems?.map((item, index) => (
            <div
              key={item?.key}
              className="glassmorphic-card rounded-2xl p-6 text-center hover-lift comedy-timing group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${item?.bgColor} border ${item?.borderColor} flex items-center justify-center group-hover:scale-110 comedy-timing`}>
                <Icon name={item?.icon} size={32} className={item?.color} />
              </div>
              
              <div className="mb-2">
                <div className={`text-3xl md:text-4xl font-bold ${item?.color} mb-1`}>
                  {formatNumber(animatedStats?.[item?.key])}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item?.suffix}
                </div>
              </div>
              
              <h3 className="font-poppins font-semibold text-foreground text-sm md:text-base">
                {item?.label}
              </h3>
            </div>
          ))}
        </div>

        {/* Live Activity Ticker */}
        <div className="mt-12 glassmorphic-card rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-inter text-sm text-muted-foreground">Live Activity</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-muted-foreground">
                <span className="text-primary font-semibold">+{Math.floor(Math.random() * 5) + 1}</span> new laughs in the last minute
              </span>
              <span className="text-muted-foreground">
                <span className="text-secondary font-semibold">{Math.floor(Math.random() * 20) + 10}</span> jokes shared recently
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="font-inter text-lg text-muted-foreground mb-6">
            Ready to join our growing community of comedy lovers?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/authentication-portal"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 comedy-timing"
            >
              <Icon name="UserPlus" size={20} />
              Join the Community
            </a>
            <a
              href="/category-explorer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 glassmorphic border border-primary/30 text-foreground font-semibold rounded-lg hover:border-primary/50 comedy-timing"
            >
              <Icon name="Compass" size={20} />
              Start Exploring
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;