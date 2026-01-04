import { OnboardingQuestion, OnboardingFlowItem, FactScreenData } from '@/types/onboarding';

export const onboardingQuestions: OnboardingQuestion[] = [
  // Q1: Why trading?
  {
    id: 'whyTrading',
    title: 'Pourquoi veux-tu apprendre le trading? 🎯',
    subtitle: 'Choisis ce qui résonne le plus avec toi',
    options: [
      { value: 'escape_9to5', icon: '🚀', label: 'Échapper au 9-5', description: 'Devenir mon propre patron' },
      { value: 'side_income', icon: '💰', label: 'Revenu supplémentaire', description: 'Garder mon job, trader à côté' },
      { value: 'wealth_building', icon: '📈', label: 'Construire mon patrimoine', description: 'Investir intelligemment long-terme' },
      { value: 'passion', icon: '❤️', label: 'Passion pour les marchés', description: "J'adore analyser les charts!" },
      { value: 'curiosity', icon: '🤔', label: 'Simple curiosité', description: "Voir si c'est pour moi" },
    ],
  },
  // Q2: Risk tolerance
  {
    id: 'riskTolerance',
    title: 'Comment te sens-tu face au risque? 🎲',
    options: [
      { value: 'risk_averse', icon: '🛡️', label: "Je déteste perdre de l'argent", description: 'Sécurité avant tout' },
      { value: 'calculated', icon: '🎯', label: 'Risque calculé seulement', description: "J'analyse avant d'agir" },
      { value: 'moderate', icon: '⚖️', label: 'Balance risque/récompense', description: 'Ni trop prudent, ni trop agressif' },
      { value: 'aggressive', icon: '🔥', label: 'High risk, high reward', description: 'Fortune favors the bold!' },
    ],
  },
  // Q3: Trading style
  {
    id: 'tradingStyle',
    title: "Quel style de trading t'attire le plus? 📊",
    options: [
      { value: 'day_trading', icon: '⚡', label: 'Day Trading', description: 'Acheter et vendre le même jour', badge: 'High intensity' },
      { value: 'swing_trading', icon: '🌊', label: 'Swing Trading', description: 'Garder quelques jours/semaines', badge: 'Medium intensity' },
      { value: 'position_trading', icon: '🏔️', label: 'Position Trading', description: 'Garder des mois/années', badge: 'Low intensity' },
      { value: 'not_sure', icon: '🤷', label: 'Pas encore sûr', description: 'Je veux découvrir tous les styles' },
    ],
  },
  // Q4: Screen time
  {
    id: 'screenTime',
    title: 'Combien de temps peux-tu passer devant les charts? ⏰',
    options: [
      { value: 'all_day', icon: '🖥️', label: 'Toute la journée', description: 'Je peux monitorer les marchés activement' },
      { value: 'few_hours', icon: '⏳', label: 'Quelques heures par jour', description: 'Matin ou soir seulement' },
      { value: '30min', icon: '⚡', label: '30 min - 1h par jour', description: 'Check rapide quotidien' },
      { value: 'weekends', icon: '📅', label: 'Weekends seulement', description: 'Je travaille full-time en semaine' },
    ],
  },
  // Q5: Starting capital
  {
    id: 'startingCapital',
    title: 'Avec quel capital peux-tu commencer? 💵',
    subtitle: 'En réel, quand tu seras prêt (pas maintenant!)',
    options: [
      { value: 'under_500', icon: '🪙', label: 'Moins de $500', description: 'Petit budget' },
      { value: '500_2000', icon: '💵', label: '$500 - $2,000', description: 'Budget starter' },
      { value: '2000_10000', icon: '💰', label: '$2,000 - $10,000', description: 'Budget confortable' },
      { value: 'over_10000', icon: '💎', label: 'Plus de $10,000', description: 'Capital important' },
      { value: 'not_decided', icon: '🤔', label: 'Pas encore décidé' },
    ],
  },
  // Q6: Main interests (multi-select, max 2)
  {
    id: 'mainInterests',
    title: "Qu'est-ce qui t'excite le plus dans le trading? 🎯",
    subtitle: "Sélectionne jusqu'à 2 options",
    multiSelect: true,
    maxSelection: 2,
    options: [
      { value: 'chart_patterns', icon: '📊', label: 'Lire les charts', description: 'Détecter patterns et tendances' },
      { value: 'fundamentals', icon: '📰', label: 'Analyse fondamentale', description: 'Étudier les entreprises' },
      { value: 'quick_profits', icon: '⚡', label: 'Profits rapides', description: 'Scalping et momentum' },
      { value: 'passive_income', icon: '💤', label: 'Revenus passifs', description: 'Dividendes et croissance' },
      { value: 'tech_tools', icon: '🤖', label: 'Outils technologiques', description: 'AI, scanners, bots' },
    ],
  },
  // Q7: Stock types (multi-select)
  {
    id: 'stockTypes',
    title: "Quels types d'actions t'intéressent? 📈",
    subtitle: "Sélectionne tout ce qui t'attire",
    multiSelect: true,
    options: [
      { value: 'blue_chips', icon: '💎', label: 'Blue Chips', description: 'Apple, Microsoft, Amazon...' },
      { value: 'growth_stocks', icon: '🚀', label: 'Growth Stocks', description: 'Tesla, NVIDIA, startups tech...' },
      { value: 'penny_stocks', icon: '🪙', label: 'Penny Stocks', description: 'Actions sous $5' },
      { value: 'etfs', icon: '📦', label: 'ETFs', description: 'SPY, QQQ, secteurs...' },
      { value: 'dividend_stocks', icon: '💰', label: 'Dividend Stocks', description: 'Revenus réguliers' },
      { value: 'not_sure', icon: '🤷', label: 'Pas encore sûr' },
    ],
  },
  // Q8: Biggest challenge (with reassurance)
  {
    id: 'biggestChallenge',
    title: 'Quel est ton plus grand défi en trading? 🤔',
    hasReassurance: true,
    options: [
      { value: 'fear_losing', icon: '😰', label: "Peur de perdre de l'argent" },
      { value: 'dont_understand', icon: '🤯', label: 'Je ne comprends pas les charts' },
      { value: 'no_strategy', icon: '🎯', label: 'Pas de stratégie claire' },
      { value: 'emotional_trading', icon: '😤', label: 'Trading émotionnel', description: 'FOMO, panic selling...' },
      { value: 'timing', icon: '⏰', label: "Mauvais timing d'entrée/sortie" },
      { value: 'not_started', icon: '🚀', label: "Je n'ai pas encore commencé!" },
    ],
  },
  // Q9: Current knowledge
  {
    id: 'currentKnowledge',
    title: 'Quel est ton niveau de connaissance actuel? 📚',
    options: [
      { value: 'zero', icon: '🌱', label: 'Zéro absolu', description: "Je ne sais même pas ce qu'est une action" },
      { value: 'basic', icon: '📖', label: 'Bases très simples', description: "J'ai vu quelques vidéos YouTube" },
      { value: 'intermediate', icon: '📚', label: 'Intermédiaire', description: 'Je connais les concepts de base' },
      { value: 'advanced', icon: '🎓', label: 'Avancé', description: 'Je veux perfectionner mes skills' },
    ],
  },
  // Q10: Experience (multi-select)
  {
    id: 'tradingExperience',
    title: 'As-tu déjà...? 💼',
    subtitle: "Sélectionne tout ce qui s'applique",
    multiSelect: true,
    options: [
      { value: 'paper_traded', icon: '📝', label: 'Fait du paper trading' },
      { value: 'real_traded', icon: '💵', label: 'Tradé en réel' },
      { value: 'lost_money', icon: '📉', label: "Perdu de l'argent en trading" },
      { value: 'made_money', icon: '📈', label: 'Fait des profits' },
      { value: 'have_broker', icon: '🏦', label: 'Ouvert un compte courtier' },
      { value: 'none', icon: '🚀', label: 'Aucune de ces réponses' },
    ],
  },
  // Q11: Sectors (multi-select, max 3)
  {
    id: 'sectors',
    title: "Quels secteurs t'intéressent? 🏢",
    subtitle: "Sélectionne jusqu'à 3",
    multiSelect: true,
    maxSelection: 3,
    options: [
      { value: 'tech', icon: '💻', label: 'Technologie', description: 'FAANG, semiconductors, cloud...' },
      { value: 'finance', icon: '🏦', label: 'Finance', description: 'Banques, assurances, fintech...' },
      { value: 'healthcare', icon: '🏥', label: 'Santé', description: 'Pharma, biotech, med devices...' },
      { value: 'energy', icon: '⚡', label: 'Énergie', description: 'Pétrole, renouvelable, utilities...' },
      { value: 'consumer', icon: '🛍️', label: 'Consommation', description: 'Retail, food & beverage, luxury...' },
      { value: 'all', icon: '🌍', label: 'Tous les secteurs' },
    ],
  },
  // Q12: Tools used
  {
    id: 'toolsUsed',
    title: 'Utilises-tu déjà des outils de trading? 🛠️',
    options: [
      { value: 'none', icon: '❌', label: "Aucun outil pour l'instant" },
      { value: 'broker_app', icon: '📱', label: 'Application de courtier', description: 'Robinhood, Webull, etc.' },
      { value: 'charting', icon: '📊', label: 'Outils de charting', description: 'TradingView, Think or Swim...' },
      { value: 'scanners', icon: '🔍', label: "Scanners d'actions", description: 'Finviz, Trade Ideas...' },
      { value: 'multiple', icon: '🎯', label: 'Plusieurs outils' },
    ],
  },
  // Q13: Trade timeline
  {
    id: 'tradeTimeline',
    title: 'Quand veux-tu faire ton premier trade réel? ⏱️',
    options: [
      { value: 'asap', icon: '🚀', label: 'Dès que possible', description: 'Dans quelques semaines' },
      { value: '1_3_months', icon: '📅', label: '1-3 mois', description: 'Je veux bien me préparer' },
      { value: '3_6_months', icon: '🎯', label: '3-6 mois', description: 'Pas pressé, qualité > vitesse' },
      { value: 'exploring', icon: '🤔', label: "J'explore seulement", description: 'Pas de timeline précise' },
    ],
  },
  // Q14: Main motivation
  {
    id: 'mainMotivation',
    title: "Qu'est-ce qui te motive le PLUS? 💪",
    options: [
      { value: 'financial_freedom', icon: '🗽', label: 'Liberté financière', description: "Ne plus dépendre d'un salaire" },
      { value: 'master_skill', icon: '🎓', label: 'Maîtriser une compétence', description: 'Devenir expert en trading' },
      { value: 'help_family', icon: '👨‍👩‍👧', label: 'Aider ma famille', description: 'Sécurité financière pour mes proches' },
      { value: 'prove_myself', icon: '💪', label: 'Me prouver quelque chose', description: 'Montrer que je peux réussir' },
      { value: 'fun_challenge', icon: '🎮', label: 'Challenge intellectuel', description: "J'adore les défis!" },
    ],
  },
  // Q15: Notifications (multi-select)
  {
    id: 'notificationPrefs',
    title: "Comment veux-tu qu'on t'aide à rester motivé? 🔔",
    subtitle: "Sélectionne tout ce qui t'intéresse",
    multiSelect: true,
    options: [
      { value: 'daily_reminders', icon: '⏰', label: 'Rappels quotidiens', description: 'Notif pour maintenir ton streak' },
      { value: 'market_alerts', icon: '📊', label: 'Alertes marché', description: 'Opportunités de trading détectées' },
      { value: 'weekly_summary', icon: '📧', label: 'Résumé hebdomadaire', description: 'Ta progression + tips de la semaine' },
      { value: 'community', icon: '👥', label: 'Communauté', description: 'Rejoindre le groupe Discord' },
      { value: 'minimal', icon: '🔕', label: 'Minimal', description: 'Juste les essentiels' },
    ],
  },
];

// Fact screens configuration (4 screens, trading-focused)
export const factScreens: Record<string, FactScreenData> = {
  trading_reality: {
    id: 'trading_reality',
    type: 'trading_reality',
    duration: 5000,
    title: '90% des traders perdent de l\'argent',
    subtitle: '...parce qu\'ils tradent sans formation.',
  },
  with_without_education: {
    id: 'with_without_education',
    type: 'with_without_education',
    duration: 5000,
    title: 'Sans formation vs Avec StockMaster',
  },
  ai_scanner: {
    id: 'ai_scanner',
    type: 'ai_scanner',
    duration: 5000,
    title: "Notre Scanner AI révolutionne l'apprentissage",
  },
  success_timeline: {
    id: 'success_timeline',
    type: 'success_timeline',
    duration: 6000,
    title: "Le parcours typique d'un trader qui réussit",
  },
};

// Define the flow order: 15 questions interleaved with 4 fact screens
export const onboardingFlowOrder: OnboardingFlowItem[] = [
  { type: 'question', questionId: 'whyTrading' },        // Q1
  { type: 'question', questionId: 'riskTolerance' },     // Q2
  { type: 'fact', factId: 'trading_reality' },           // Fact 1: 90% lose
  { type: 'question', questionId: 'tradingStyle' },      // Q3
  { type: 'question', questionId: 'screenTime' },        // Q4
  { type: 'question', questionId: 'startingCapital' },   // Q5
  { type: 'fact', factId: 'with_without_education' },    // Fact 2: With vs Without
  { type: 'question', questionId: 'mainInterests' },     // Q6
  { type: 'question', questionId: 'stockTypes' },        // Q7
  { type: 'fact', factId: 'ai_scanner' },                // Fact 3: AI Scanner
  { type: 'question', questionId: 'biggestChallenge' },  // Q8
  { type: 'question', questionId: 'currentKnowledge' },  // Q9
  { type: 'question', questionId: 'tradingExperience' }, // Q10
  { type: 'fact', factId: 'success_timeline' },          // Fact 4: 8-week timeline
  { type: 'question', questionId: 'sectors' },           // Q11
  { type: 'question', questionId: 'toolsUsed' },         // Q12
  { type: 'question', questionId: 'tradeTimeline' },     // Q13
  { type: 'question', questionId: 'mainMotivation' },    // Q14
  { type: 'question', questionId: 'notificationPrefs' }, // Q15
];

export function getQuestionByIndex(index: number): OnboardingQuestion | undefined {
  const flowItem = onboardingFlowOrder[index];
  if (flowItem?.type === 'question') {
    return onboardingQuestions.find(q => q.id === flowItem.questionId);
  }
  return undefined;
}

export function getFactScreenByIndex(index: number): FactScreenData | undefined {
  const flowItem = onboardingFlowOrder[index];
  if (flowItem?.type === 'fact') {
    return factScreens[flowItem.factId];
  }
  return undefined;
}

export function getTotalQuestions(): number {
  return onboardingQuestions.length;
}

export function getCurrentQuestionNumber(flowIndex: number): number {
  let count = 0;
  for (let i = 0; i <= flowIndex; i++) {
    if (onboardingFlowOrder[i]?.type === 'question') {
      count++;
    }
  }
  return count;
}

// Challenge reassurance messages
export const challengeReassurances: Record<string, { title: string; description: string }> = {
  fear_losing: {
    title: 'Le simulateur élimine ce risque!',
    description: '$100,000 virtuels pour pratiquer. Tu ne risques rien pendant des mois.',
  },
  dont_understand: {
    title: 'On commence vraiment à zéro!',
    description: 'Nos leçons expliquent CHAQUE élément d\'un chart. Pas de jargon.',
  },
  no_strategy: {
    title: 'On te donne 5+ stratégies éprouvées!',
    description: 'Step-by-step, avec exemples réels et backtesting.',
  },
  emotional_trading: {
    title: "Le simulateur t'entraîne émotionnellement!",
    description: 'Tu vis les hauts et bas SANS risque financier. Meilleure préparation possible.',
  },
  timing: {
    title: "Notre scanner AI t'aide à voir les setups!",
    description: "Apprends à reconnaître les bons points d'entrée/sortie avec l'IA.",
  },
  not_started: {
    title: 'Tu es au bon endroit!',
    description: "On te guide de A à Z. C'est le meilleur moment pour commencer.",
  },
};
