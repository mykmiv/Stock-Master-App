import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, TrendingUp, TrendingDown, Medal, Crown, Target } from 'lucide-react';
import { useLeague } from '@/hooks/useLeague';
import { getLeagueConfig, LEAGUE_SIZE } from '@/data/leagues';

export function LeagueBadgeCard() {
  const { userLeague, leagueConfig, isLoading, daysLeft } = useLeague();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            League
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userLeague) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            League
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-muted-foreground mb-4">
            Rejoignez les leagues pour compétir avec d'autres traders!
          </p>
          <Button asChild>
            <Link to="/league">Rejoindre une League</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentRank = userLeague.league_rank || LEAGUE_SIZE;
  const isTop3 = currentRank <= 3;
  const isTop10 = currentRank <= 10;
  const isBottomZone = currentRank > LEAGUE_SIZE - 5;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            League Actuelle
          </span>
          <Badge variant="outline" className="text-xs">
            {daysLeft}j restants
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* League Badge */}
        <div className="flex items-center gap-4">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center text-3xl ${leagueConfig?.bgColor} border-2 ${leagueConfig?.borderColor}`}>
            {leagueConfig?.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className={`text-xl font-bold ${leagueConfig?.color}`}>
                {userLeague.current_league}
              </h3>
              {isTop3 && <Crown className="h-5 w-5 text-yellow-500" />}
            </div>
            <p className="text-sm text-muted-foreground">
              Rang #{currentRank} sur {LEAGUE_SIZE}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {isTop10 && !isTop3 && (
                <Badge className="bg-green-500/20 text-green-600 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Zone Promotion
                </Badge>
              )}
              {isTop3 && (
                <Badge className="bg-yellow-500/20 text-yellow-600 text-xs">
                  <Medal className="h-3 w-3 mr-1" />
                  Podium
                </Badge>
              )}
              {isBottomZone && (
                <Badge className="bg-red-500/20 text-red-600 text-xs">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Zone Relégation
                </Badge>
              )}
              {!isTop10 && !isBottomZone && (
                <Badge variant="secondary" className="text-xs">
                  <Target className="h-3 w-3 mr-1" />
                  Zone Safe
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Monthly XP */}
        <div className="bg-accent/50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">XP ce mois</span>
            <span className="font-bold">{userLeague.monthly_xp?.toLocaleString() || 0} XP</span>
          </div>
        </div>

        {/* Stats History */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-accent/30 rounded-lg p-2">
            <p className="text-lg font-bold text-green-500">
              {userLeague.total_promotions || 0}
            </p>
            <p className="text-xs text-muted-foreground">Promotions</p>
          </div>
          <div className="bg-accent/30 rounded-lg p-2">
            <p className="text-lg font-bold text-yellow-500">
              {userLeague.total_top_3_finishes || 0}
            </p>
            <p className="text-xs text-muted-foreground">Top 3</p>
          </div>
          <div className="bg-accent/30 rounded-lg p-2">
            <p className="text-lg font-bold text-primary">
              {userLeague.total_first_place_finishes || 0}
            </p>
            <p className="text-xs text-muted-foreground">#1 Places</p>
          </div>
        </div>

        {/* Highest League */}
        {userLeague.highest_league_reached && userLeague.highest_league_reached !== 'Bronze' && (
          <div className="flex items-center justify-between text-sm border-t pt-3">
            <span className="text-muted-foreground">Meilleure league atteinte</span>
            <div className="flex items-center gap-1">
              <span>{getLeagueConfig(userLeague.highest_league_reached as any)?.icon}</span>
              <span className={`font-medium ${getLeagueConfig(userLeague.highest_league_reached as any)?.color}`}>
                {userLeague.highest_league_reached}
              </span>
            </div>
          </div>
        )}

        {/* View Full Leaderboard */}
        <Button variant="outline" className="w-full" asChild>
          <Link to="/league">Voir le classement complet</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
