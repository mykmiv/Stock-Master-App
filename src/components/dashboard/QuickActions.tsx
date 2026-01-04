import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ScanLine, 
  LineChart, 
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
  {
    title: 'Continue Learning',
    description: 'Pick up where you left off',
    icon: GraduationCap,
    path: '/learn',
    gradient: 'bg-gradient-purple',
    iconBg: 'bg-purple-500',
  },
  {
    title: 'AI Chart Scanner',
    description: 'Analyze any stock chart',
    icon: ScanLine,
    path: '/scanner',
    gradient: 'bg-gradient-blue',
    iconBg: 'bg-secondary',
    badge: 'AI',
  },
  {
    title: 'Paper Trading',
    description: 'Practice with $100K virtual',
    icon: LineChart,
    path: '/trade',
    gradient: 'bg-gradient-emerald',
    iconBg: 'bg-primary',
  },
  {
    title: 'Go Live Guide',
    description: 'Ready for real trading?',
    icon: Compass,
    path: '/bridge',
    gradient: 'bg-gradient-orange',
    iconBg: 'bg-warning',
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        
        return (
          <Link key={action.path} to={action.path}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`card-elevated p-5 ${action.gradient} group cursor-pointer h-full`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`icon-circle-lg ${action.iconBg} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  {action.badge && (
                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-warning text-black">
                      <Sparkles className="h-3 w-3" />
                      {action.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-black text-base mb-1">{action.title}</h3>
                <p className="text-xs text-muted-foreground flex-1">{action.description}</p>
                <div className="flex items-center gap-1 text-xs text-primary font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Start <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
