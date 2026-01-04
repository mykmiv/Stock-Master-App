import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, CheckCircle2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  type: 'lesson' | 'trade' | 'scan' | 'quiz';
  progress: number;
  target: number;
  completed: boolean;
}

const dailyChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Complete a Lesson',
    description: 'Finish any lesson to earn bonus XP',
    xpReward: 25,
    type: 'lesson',
    progress: 0,
    target: 1,
    completed: false,
  },
  {
    id: '2',
    title: 'Analyze a Chart',
    description: 'Use the AI scanner on any stock chart',
    xpReward: 20,
    type: 'scan',
    progress: 0,
    target: 1,
    completed: false,
  },
  {
    id: '3',
    title: 'Make 3 Trades',
    description: 'Execute 3 paper trades today',
    xpReward: 30,
    type: 'trade',
    progress: 1,
    target: 3,
    completed: false,
  },
];

export function DailyChallenge() {
  const [challenges, setChallenges] = useState<Challenge[]>(dailyChallenges);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, []);

  const completedCount = challenges.filter(c => c.completed).length;
  const totalXp = challenges.reduce((acc, c) => acc + (c.completed ? c.xpReward : 0), 0);
  const potentialXp = challenges.reduce((acc, c) => acc + c.xpReward, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 relative overflow-hidden"
    >
      {/* Sparkles background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Sparkles className="absolute top-3 right-3 h-6 w-6 text-warning animate-pulse" />
        <Sparkles className="absolute bottom-6 left-3 h-5 w-5 text-pink-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute top-1/2 right-6 h-4 w-4 text-purple-500 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="icon-circle bg-gradient-to-br from-warning to-orange-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-lg">Daily Challenges</h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {timeLeft} left
              </div>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="flex items-center justify-between text-sm mb-4 p-3 rounded-xl bg-white/50 dark:bg-black/20">
          <span className="text-muted-foreground font-semibold">
            {completedCount}/{challenges.length} completed
          </span>
          <span className="font-black flex items-center gap-1 text-warning">
            <Star className="h-4 w-4 fill-warning" />
            {totalXp}/{potentialXp} XP
          </span>
        </div>

        {/* Challenges List */}
        <div className="space-y-3">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border-2 transition-all ${
                challenge.completed 
                  ? 'bg-success/10 border-success/30' 
                  : 'bg-white/60 dark:bg-black/20 border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {challenge.completed ? (
                    <div className="h-6 w-6 rounded-full bg-success flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <span className={`font-bold text-sm ${challenge.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {challenge.title}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {challenge.description}
                    </p>
                    
                    {/* Progress bar for multi-step challenges */}
                    {!challenge.completed && challenge.target > 1 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-bold">{challenge.progress}/{challenge.target}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500"
                            style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs font-black text-warning flex items-center gap-1 ml-2">
                  <Star className="h-3 w-3 fill-warning" />
                  +{challenge.xpReward}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
