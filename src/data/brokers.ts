export interface Broker {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  
  // Financial
  minDeposit: number;
  minDepositNote?: string;
  commission: string;
  optionsCommission?: string;
  marginRate: string;
  
  // Ease of use
  easeOfUse: number;
  mobileApp: number;
  platformComplexity: 'beginner' | 'intermediate' | 'advanced';
  
  // Features
  features: string[];
  pros: string[];
  cons: string[];
  
  // Timing
  accountOpeningTime: string;
  fundingTime: string;
  withdrawalTime: string;
  
  // Support
  customerSupport: string;
  supportHours: string;
  
  // Ratings
  educationalResources: number;
  researchTools: number;
  
  // Recommendations
  bestFor: string[];
  notRecommendedFor: string[];
  
  url: string;
  affiliateNote?: string;
}

export const brokers: Broker[] = [
  {
    id: 'fidelity',
    name: 'Fidelity Investments',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Fidelity_Investments_logo.svg/2560px-Fidelity_Investments_logo.svg.png',
    tagline: 'Le choix des investisseurs sérieux',
    description: 'Courtier full-service avec excellente recherche et outils gratuits',
    
    minDeposit: 0,
    minDepositNote: 'Aucun minimum, mais $10-20 recommandés pour commencer',
    commission: '$0 pour actions et ETFs',
    optionsCommission: '$0 base + $0.65/contrat',
    marginRate: '13.325% - 17.325%',
    
    easeOfUse: 3,
    mobileApp: 4.5,
    platformComplexity: 'intermediate',
    
    features: [
      'Trading actions, ETFs, options, fonds mutuels',
      'Recherche premium gratuite (Morningstar, etc.)',
      'Fractional shares (acheter moins de 1 action)',
      'Robo-advisor disponible (Fidelity Go)',
      'Compte chèque intégré',
      'Service client 24/7'
    ],
    
    pros: [
      'Aucune commission sur actions/ETFs',
      'Excellents outils de recherche gratuits',
      'Aucun minimum de compte',
      'Application mobile très complète',
      'Forte réputation (fondé en 1946)',
      'Service client disponible 24/7'
    ],
    
    cons: [
      'Interface peut être complexe pour débutants',
      'Trop d\'options peut être overwhelming',
      'Pas de crypto trading',
      'Site web moins moderne que concurrents'
    ],
    
    accountOpeningTime: '5-10 minutes en ligne',
    fundingTime: 'ACH: 1-3 jours, Wire: Même jour',
    withdrawalTime: '1-3 jours ouvrables',
    
    customerSupport: '24/7 par téléphone, chat, email',
    supportHours: '24h/24, 7j/7',
    
    educationalResources: 5,
    researchTools: 5,
    
    bestFor: [
      'Investisseurs long-terme',
      'Ceux qui valorisent la recherche',
      'Débutants sérieux prêts à apprendre',
      'Comptes de retraite (IRA, Roth IRA)',
      'Budget: $100+'
    ],
    
    notRecommendedFor: [
      'Day traders actifs',
      'Traders de crypto',
      'Ceux voulant interface ultra-simple'
    ],
    
    url: 'https://www.fidelity.com',
    affiliateNote: 'Courtier réputé, aucune affiliation marketing'
  },
  
  {
    id: 'schwab',
    name: 'Charles Schwab',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Charles_Schwab_Corporation_logo.svg/2560px-Charles_Schwab_Corporation_logo.svg.png',
    tagline: 'Full-service avec branches physiques',
    description: 'Service complet avec support exceptionnel et options bancaires',
    
    minDeposit: 0,
    minDepositNote: 'Pas de minimum, mais $25+ recommandé pour diversifier',
    commission: '$0 pour actions et ETFs',
    optionsCommission: '$0 base + $0.65/contrat',
    marginRate: '13.25% - 17.25%',
    
    easeOfUse: 3.5,
    mobileApp: 4,
    platformComplexity: 'intermediate',
    
    features: [
      'Trading actions, ETFs, options, futures',
      'Accès à 300+ branches physiques aux USA',
      'Services bancaires intégrés (compte chèque, carte débit)',
      'Schwab Intelligent Portfolios (robo-advisor gratuit)',
      'Fractional shares',
      'Support 24/7'
    ],
    
    pros: [
      'Support exceptionnel (branches + 24/7)',
      'Aucune commission actions/ETFs',
      'Services bancaires complets',
      'Plateforme complète (thinkorswim après fusion TD)',
      'Robo-advisor gratuit',
      'Pas de minimums'
    ],
    
    cons: [
      'Taux de marge plus élevés',
      'Interface moins intuitive que Robinhood',
      'Pas de crypto',
      'Beaucoup de features = peut être complexe'
    ],
    
    accountOpeningTime: '5-15 minutes en ligne',
    fundingTime: 'ACH: 1-4 jours, Wire: Même jour, Instant: jusqu\'à $1,000',
    withdrawalTime: '2-4 jours ouvrables',
    
    customerSupport: '24/7 téléphone, chat, email + branches',
    supportHours: '24h/24, 7j/7 + horaires branches',
    
    educationalResources: 5,
    researchTools: 4.5,
    
    bestFor: [
      'Investisseurs voulant support en personne',
      'Ceux cherchant services bancaires + investissement',
      'Traders options (thinkorswim)',
      'Retraités ou planification retraite',
      'Budget: $100+'
    ],
    
    notRecommendedFor: [
      'Traders crypto',
      'Ceux voulant interface minimaliste',
      'Day traders cherchant meilleurs taux marge'
    ],
    
    url: 'https://www.schwab.com',
    affiliateNote: 'Courtier établi, aucune affiliation'
  },
  
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Interactive_Brokers_Logo.svg/2560px-Interactive_Brokers_Logo.svg.png',
    tagline: 'Pour traders actifs et professionnels',
    description: 'Plateforme pro avec marchés internationaux et meilleurs taux de marge',
    
    minDeposit: 0,
    minDepositNote: 'Pas de minimum officiel, mais $100-500 recommandé',
    commission: '$0 pour IBKR Lite, $0.0035/action pour IBKR Pro',
    optionsCommission: '$0 (Lite) ou $0.65/contrat (Pro)',
    marginRate: '5.83% - 6.83%',
    
    easeOfUse: 2,
    mobileApp: 4,
    platformComplexity: 'advanced',
    
    features: [
      'Accès à 150+ marchés dans 33 pays',
      'Actions, options, futures, forex, obligations',
      'Meilleurs taux de marge de l\'industrie',
      'Plateforme Trader Workstation (TWS) professionnelle',
      'Paper trading intégré',
      'API pour trading algorithmique',
      'Fractional shares'
    ],
    
    pros: [
      'Accès aux marchés internationaux',
      'Taux de marge imbattables (5-6%)',
      'Outils professionnels (TWS)',
      'Parfait pour traders actifs',
      'Paper trading gratuit',
      'API pour algo trading',
      'Commissions très basses (Pro)'
    ],
    
    cons: [
      'TRÈS complexe pour débutants',
      'Interface intimidante',
      'Frais d\'inactivité possibles',
      'Courbe d\'apprentissage abrupte',
      'Support client moins accessible',
      'Pas de crypto'
    ],
    
    accountOpeningTime: '10-20 minutes, approbation 1-2 jours',
    fundingTime: 'ACH: 3-5 jours, Wire: 1 jour',
    withdrawalTime: '2-5 jours ouvrables',
    
    customerSupport: 'Téléphone, ticket, chat (heures limitées)',
    supportHours: 'Lun-Ven 24h, weekend limité',
    
    educationalResources: 4,
    researchTools: 5,
    
    bestFor: [
      'Traders actifs (10+ trades/mois)',
      'Trading international',
      'Traders options/futures',
      'Ceux utilisant la marge',
      'Développeurs (algo trading)',
      'Budget: $500+'
    ],
    
    notRecommendedFor: [
      'Débutants complets',
      'Investisseurs passifs',
      'Ceux cherchant simplicité'
    ],
    
    url: 'https://www.interactivebrokers.com',
    affiliateNote: 'Courtier pro reconnu mondialement'
  },
  
  {
    id: 'robinhood',
    name: 'Robinhood',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Robinhood_Markets_logo.svg/2560px-Robinhood_Markets_logo.svg.png',
    tagline: 'L\'interface la plus simple du marché',
    description: 'Parfait pour débutants avec interface minimaliste et dépôts instantanés',
    
    minDeposit: 0,
    minDepositNote: 'Vraiment $0, mais $10-50 recommandé pour acheter actions entières',
    commission: '$0 pour actions, ETFs, options',
    optionsCommission: '$0 (inclus)',
    marginRate: '12% (Gold) ou 6.5% (Gold 5%+ utilisé)',
    
    easeOfUse: 5,
    mobileApp: 5,
    platformComplexity: 'beginner',
    
    features: [
      'Interface ultra-simple et intuitive',
      'Dépôts instantanés (jusqu\'à $1,000)',
      'Trading crypto intégré (Bitcoin, Ethereum, etc.)',
      'Fractional shares',
      'Robinhood Gold ($5/mois pour marge et data)',
      'Récap fiscal automatique',
      'Extension heures de trading'
    ],
    
    pros: [
      'TRÈS facile à utiliser',
      'Interface mobile magnifique',
      'Dépôts instantanés',
      'Vraiment $0 minimum',
      'Crypto disponible',
      'Parfait pour apprendre',
      'Fractional shares dès $1'
    ],
    
    cons: [
      'Recherche limitée',
      'Service client parfois lent',
      'Payment for order flow (PFOF) controversé',
      'Moins d\'outils avancés',
      'Historique de pannes lors pics volatilité',
      'Pas de comptes IRA/Roth',
      'Desktop web basique'
    ],
    
    accountOpeningTime: '3-5 minutes',
    fundingTime: 'Instant jusqu\'à $1,000, ACH: 3-5 jours',
    withdrawalTime: '2-5 jours ouvrables',
    
    customerSupport: 'Email, chat in-app (réponse 24-72h)',
    supportHours: '24/7 via app, mais réponse différée',
    
    educationalResources: 2,
    researchTools: 2,
    
    bestFor: [
      'Débutants ABSOLUS',
      'Jeunes investisseurs (18-30 ans)',
      'Ceux voulant essayer avec <$100',
      'Traders crypto occasionnels',
      'Mobile-first users',
      'Budget: Aussi bas que $10'
    ],
    
    notRecommendedFor: [
      'Investisseurs cherchant recherche poussée',
      'Ceux voulant comptes retraite (IRA)',
      'Traders actifs sérieux',
      'Ceux nécessitant support rapide'
    ],
    
    url: 'https://robinhood.com',
    affiliateNote: 'App populaire, controverses passées sur fiabilité'
  },
  
  {
    id: 'webull',
    name: 'Webull',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Webull_Logo.svg/2560px-Webull_Logo.svg.png',
    tagline: 'Simple mais avec vrais outils de trading',
    description: 'Mélange parfait entre simplicité Robinhood et outils pros',
    
    minDeposit: 0,
    minDepositNote: 'Pas de minimum, promotions fréquentes (actions gratuites)',
    commission: '$0 pour actions, ETFs, options',
    optionsCommission: '$0',
    marginRate: '6.99%',
    
    easeOfUse: 4,
    mobileApp: 4.5,
    platformComplexity: 'beginner',
    
    features: [
      'Interface moderne et propre',
      'Outils de charting avancés (gratuits)',
      'Trading extended hours (4am-8pm ET)',
      'Crypto trading intégré',
      'Paper trading gratuit',
      'Scanner d\'actions intégré',
      'Fractional shares'
    ],
    
    pros: [
      'Excellent pour apprendre (paper trading)',
      'Charting gratuit très complet',
      'Interface belle et intuitive',
      'Promotions fréquentes (actions gratuites)',
      'Crypto disponible',
      'Extended hours trading',
      'Parfait mix simplicité/features'
    ],
    
    cons: [
      'Pas de comptes IRA/Roth',
      'Support client moyen',
      'Moins établi (fondé 2017)',
      'PFOF comme Robinhood',
      'Recherche fondamentale limitée'
    ],
    
    accountOpeningTime: '5 minutes',
    fundingTime: 'ACH: 2-5 jours (pas de dépôt instant)',
    withdrawalTime: '3-5 jours ouvrables',
    
    customerSupport: 'Email, chat in-app',
    supportHours: '24/7 soumission, réponse 12-48h',
    
    educationalResources: 3,
    researchTools: 4,
    
    bestFor: [
      'Débutants voulant apprendre le charting',
      'Ceux cherchant paper trading gratuit',
      'Jeunes investisseurs tech-savvy',
      'Traders occasionnels crypto',
      'Budget: $25+'
    ],
    
    notRecommendedFor: [
      'Comptes retraite (IRA)',
      'Ceux voulant courtier très établi',
      'Investisseurs long-terme passifs'
    ],
    
    url: 'https://www.webull.com',
    affiliateNote: 'App montante, promotions attractives'
  },
  
  {
    id: 'etrade',
    name: 'E*TRADE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/E-Trade_logo.svg/2560px-E-Trade_logo.svg.png',
    tagline: 'Équilibre entre simplicité et puissance',
    description: 'Plateforme complète appartenant à Morgan Stanley',
    
    minDeposit: 0,
    minDepositNote: 'Pas de minimum, mais $500+ pour débloquer certains features',
    commission: '$0 pour actions et ETFs',
    optionsCommission: '$0 base + $0.50-$0.65/contrat',
    marginRate: '12.25% - 17.25%',
    
    easeOfUse: 3.5,
    mobileApp: 4,
    platformComplexity: 'intermediate',
    
    features: [
      'Plateformes multiples (web, mobile, Power E*TRADE)',
      'Excellents outils options',
      'Banking services (compte chèque)',
      'Robo-advisor (Core Portfolios)',
      'Recherche complète',
      'Fractional shares'
    ],
    
    pros: [
      'Plateforme équilibrée',
      'Bons outils pour options',
      'Support Morgan Stanley',
      'Interface propre',
      'Services bancaires'
    ],
    
    cons: [
      'Taux de marge moyens',
      'Pas aussi simple que Robinhood',
      'Pas aussi avancé que IBKR',
      'Pas de crypto'
    ],
    
    accountOpeningTime: '10 minutes',
    fundingTime: 'ACH: 3-5 jours',
    withdrawalTime: '2-4 jours',
    
    customerSupport: '24/7 téléphone et chat',
    supportHours: '24h/24, 7j/7',
    
    educationalResources: 4,
    researchTools: 4,
    
    bestFor: [
      'Investisseurs intermédiaires',
      'Traders options',
      'Ceux voulant banking + investing',
      'Budget: $100+'
    ],
    
    notRecommendedFor: [
      'Débutants complets',
      'Day traders actifs',
      'Traders crypto'
    ],
    
    url: 'https://us.etrade.com',
    affiliateNote: 'Établi, propriété de Morgan Stanley'
  }
];
