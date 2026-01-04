import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LeagueMember } from '@/hooks/useLeague';
import { getZoneStatus, LEAGUE_SIZE } from '@/data/leagues';

interface LeaderboardRowProps {
  member: LeagueMember;
  rank: number;
  isCurrentUser: boolean;
  totalMembers?: number;
}

export function LeaderboardRow({ member, rank, isCurrentUser, totalMembers = LEAGUE_SIZE }: LeaderboardRowProps) {
  const zone = getZoneStatus(rank, totalMembers);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.02 }}
      className={cn(
        'flex items-center gap-4 p-4 border-b transition-colors hover:bg-muted/50',
        isCurrentUser && 'bg-primary/5 border-l-4 border-l-primary',
        zone === 'promotion' && !isCurrentUser && 'bg-emerald-500/5',
        zone === 'demotion' && !isCurrentUser && 'bg-destructive/5'
      )}
    >
      {/* Rank Badge */}
      <div className={cn(
        'h-10 w-10 rounded-full flex items-center justify-center font-black text-lg shrink-0',
        rank === 1 && 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30',
        rank === 2 && 'bg-slate-400 text-white',
        rank === 3 && 'bg-amber-600 text-white',
        rank > 3 && rank <= 10 && 'bg-emerald-500/20 text-emerald-600',
        rank > 10 && rank <= totalMembers - 5 && 'bg-muted text-foreground',
        rank > totalMembers - 5 && 'bg-destructive/20 text-destructive'
      )}>
        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={member.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {member.username?.[0]?.toUpperCase() || 'T'}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className={cn(
              'font-bold truncate',
              isCurrentUser && 'text-primary'
            )}>
              {member.username || 'Trader'}
              {isCurrentUser && <span className="text-primary ml-1">(Toi)</span>}
            </p>
            {rank === 1 && (
              <Crown className="h-4 w-4 text-yellow-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Niveau {member.current_level}
          </p>
        </div>
      </div>

      {/* Weekly XP */}
      <div className="text-right shrink-0">
        <p className="font-black text-lg text-primary">
          {member.monthly_xp.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">XP</p>
      </div>

      {/* Zone Indicator */}
      <div className="w-16 shrink-0 text-right">
        {zone === 'promotion' && (
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold justify-end">
            <ArrowUp className="h-4 w-4" />
            <span className="hidden sm:inline">Promo</span>
          </div>
        )}
        {zone === 'demotion' && (
          <div className="flex items-center gap-1 text-destructive text-xs font-bold justify-end">
            <ArrowDown className="h-4 w-4" />
            <span className="hidden sm:inline">Démo</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
