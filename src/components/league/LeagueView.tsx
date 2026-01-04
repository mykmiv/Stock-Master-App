import { motion } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown, Minus, Trophy, Gift, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLeague } from '@/hooks/useLeague';
import { useAuth } from '@/hooks/useAuth';
import { LeaderboardRow } from '@/components/league/LeaderboardRow';
import { 
  getZoneStatus, 
  PROMOTION_ZONE, 
  DEMOTION_ZONE,
  LEAGUES,
  getNextLeague
} from '@/data/leagues';
import { cn } from '@/lib/utils';
import { formatReward } from '@/data/xpLevels';

export function LeagueView() {
  const { user } = useAuth();
  const {
    userLeague,
    leagueConfig,
    leagueMembers,
    isLoading,
    daysLeft,
    joinLeague,
  } = useLeague();

  // Find user's position in the leaderboard
  const userRank = leagueMembers.findIndex(m => m.user_id === user?.id) + 1 || leagueMembers.length;
  const zone = getZoneStatus(userRank, leagueMembers.length);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 bg-muted animate-pulse rounded-xl" />
        <div className="h-96 bg-muted animate-pulse rounded-xl" />
      </div>
    );
  }

  // Not yet in a league
  if (!userLeague) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🏆
          </motion.div>
          <h2 className="text-2xl font-black mb-2">Rejoins les Leagues!</h2>
          <p className="text-muted-foreground mb-6">
            Compétition mensuelle contre 50 traders. Monte dans les rangs et gagne des rewards!
          </p>
          <Button size="lg" className="w-full font-bold" onClick={joinLeague}>
            <Trophy className="h-5 w-5 mr-2" />
            Commencer en Bronze
          </Button>
        </CardContent>
      </Card>
    );
  }

  const nextLeague = getNextLeague(userLeague.current_league);
  const monthlyXPGoal = leagueConfig?.monthlyXPRequirement || 20000;

  return (
    <div className="space-y-6">
      {/* League Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className={cn(
          'border-2 overflow-hidden',
          leagueConfig?.borderColor
        )}>
          <div className={cn(
            'absolute inset-0 opacity-10',
            leagueConfig?.bgColor
          )} />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* League Info */}
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl"
                >
                  {leagueConfig?.icon}
                </motion.div>
                <div>
                  <h2 className={cn('text-2xl font-black', leagueConfig?.color)}>
                    {leagueConfig?.name} League
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Fin dans {daysLeft} jour{daysLeft > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              {/* User Rank */}
              <div className="text-right">
                <p className="text-4xl font-black text-primary">#{userRank}</p>
                <p className="text-sm text-muted-foreground">Ta position</p>
              </div>
            </div>

            {/* Monthly Progress */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold">XP ce mois</span>
                <span className="font-bold text-primary">{userLeague.monthly_xp.toLocaleString()} XP</span>
              </div>
              <Progress value={Math.min((userLeague.monthly_xp / monthlyXPGoal) * 100, 100)} className="h-3" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>0 XP</span>
                <span>{monthlyXPGoal.toLocaleString()} XP</span>
              </div>
            </div>

            {/* Zone Status Alert */}
            <Alert className={cn(
              'mt-4',
              zone === 'promotion' && 'bg-emerald-500/10 border-emerald-500',
              zone === 'demotion' && 'bg-destructive/10 border-destructive',
              zone === 'safe' && 'bg-warning/10 border-warning'
            )}>
              {zone === 'promotion' && <TrendingUp className="h-4 w-4 text-emerald-500" />}
              {zone === 'demotion' && <TrendingDown className="h-4 w-4 text-destructive" />}
              {zone === 'safe' && <Minus className="h-4 w-4 text-warning" />}
              <AlertDescription>
                {zone === 'promotion' && (
                  <span className="text-emerald-600 font-bold">
                    🎉 Top {PROMOTION_ZONE}! Tu montes en {nextLeague?.name || 'ligue supérieure'}!
                  </span>
                )}
                {zone === 'demotion' && (
                  <span className="text-destructive font-bold">
                    ⚠️ Bottom {DEMOTION_ZONE}! Gagne de l'XP pour rester!
                  </span>
                )}
                {zone === 'safe' && (
                  <span className="text-amber-600 font-bold">
                    😌 Position safe. Continue pour monter!
                  </span>
                )}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="leaderboard">
        <TabsList className="w-full">
          <TabsTrigger value="leaderboard" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            Classement
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex-1">
            <Gift className="h-4 w-4 mr-2" />
            Rewards
          </TabsTrigger>
          <TabsTrigger value="leagues" className="flex-1">
            <Trophy className="h-4 w-4 mr-2" />
            Toutes les Leagues
          </TabsTrigger>
        </TabsList>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Classement de ta League</span>
                <Badge variant="secondary">
                  {leagueMembers.length} participants
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Zone indicators */}
              <div className="px-4 py-2 bg-muted/50 border-b flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  Top {PROMOTION_ZONE} = Promotion
                </span>
                <span className="flex items-center gap-1 text-destructive">
                  Bottom {DEMOTION_ZONE} = Demotion
                  <TrendingDown className="h-3 w-3" />
                </span>
              </div>

              {/* Leaderboard */}
              <div className="max-h-[500px] overflow-y-auto">
                {leagueMembers.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun autre participant pour l'instant</p>
                    <p className="text-sm">Sois le premier à gagner de l'XP!</p>
                  </div>
                ) : (
                  leagueMembers.map((member, index) => (
                    <LeaderboardRow
                      key={member.id}
                      member={member}
                      rank={index + 1}
                      isCurrentUser={member.user_id === user?.id}
                      totalMembers={leagueMembers.length}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Rewards {leagueConfig?.name} League</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Top 1 */}
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🥇</span>
                  <div>
                    <p className="font-bold text-yellow-600">1ère Place</p>
                    <p className="text-xs text-muted-foreground">Le champion du mois</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leagueConfig?.rewards.top1.map((reward, i) => (
                    <Badge key={i} variant="secondary">{formatReward(reward)}</Badge>
                  ))}
                </div>
              </div>

              {/* Top 3 */}
              <div className="p-4 rounded-xl bg-slate-400/10 border border-slate-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-bold">Top 3</p>
                    <p className="text-xs text-muted-foreground">2ème et 3ème place</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leagueConfig?.rewards.top3.map((reward, i) => (
                    <Badge key={i} variant="secondary">{formatReward(reward)}</Badge>
                  ))}
                </div>
              </div>

              {/* Top 10 */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                  <div>
                    <p className="font-bold text-emerald-600">Top 10 (Promotion)</p>
                    <p className="text-xs text-muted-foreground">Monte à la ligue supérieure</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leagueConfig?.rewards.top10.map((reward, i) => (
                    <Badge key={i} variant="secondary">{formatReward(reward)}</Badge>
                  ))}
                </div>
              </div>

              {/* Participation */}
              <div className="p-4 rounded-xl bg-muted">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="font-bold">Participation</p>
                    <p className="text-xs text-muted-foreground">Reste actif ce mois</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leagueConfig?.rewards.participation.map((reward, i) => (
                    <Badge key={i} variant="outline">{formatReward(reward)}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Leagues Tab */}
        <TabsContent value="leagues">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les Leagues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {LEAGUES.map((league, index) => (
                  <motion.div
                    key={league.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border transition-all',
                      league.name === userLeague.current_league && 'ring-2 ring-primary',
                      league.bgColor
                    )}
                  >
                    <span className="text-3xl">{league.icon}</span>
                    <div className="flex-1">
                      <p className={cn('font-bold', league.color)}>{league.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Min {league.monthlyXPRequirement.toLocaleString()} XP/mois
                      </p>
                    </div>
                    {league.name === userLeague.current_league && (
                      <Badge>Toi</Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
