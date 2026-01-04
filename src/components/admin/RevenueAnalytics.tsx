import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  TrendingUp,
  Users,
  CreditCard
} from 'lucide-react';

export function RevenueAnalytics() {
  // Placeholder data - integrate with Stripe when needed
  const revenueData = {
    mrr: 0,
    totalRevenue: 0,
    subscribers: 0,
    conversionRate: 0
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Revenus & Abonnements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              MRR
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${revenueData.mrr}</div>
            <p className="text-xs text-muted-foreground">Monthly Recurring Revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenu
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${revenueData.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">Depuis le lancement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Abonnés Payants
            </CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{revenueData.subscribers}</div>
            <p className="text-xs text-muted-foreground">Abonnements actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de Conversion
            </CardTitle>
            <CreditCard className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{revenueData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Free → Paid</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Intégration Stripe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Les données de revenus seront disponibles une fois l'intégration Stripe configurée.
            Connectez votre compte Stripe pour voir les statistiques en temps réel.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
