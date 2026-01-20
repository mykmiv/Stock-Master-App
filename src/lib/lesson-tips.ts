// Tips and guides for lessons - Duolingo style

export interface LessonTip {
  title: string;
  description: string;
  example?: string;
}

export const CHAPTER_TIPS: Record<number, LessonTip[]> = {
  1: [
    {
      title: 'Qu\'est-ce qu\'une Action?',
      description: 'Une action représente la propriété d\'une entreprise. Quand tu achètes une action, tu deviens propriétaire partiel (actionnaire) de cette entreprise.',
      example: 'Si tu achètes 10 actions d\'Apple à 150$ chacune, tu possèdes 1500$ d\'actions Apple.'
    },
    {
      title: 'Les Prix des Actions Changent',
      description: 'Les prix des actions montent et descendent selon l\'offre et la demande. Plus de demandeurs = prix qui monte. Plus de vendeurs = prix qui descend.',
      example: 'Si tout le monde veut acheter des actions Tesla, le prix va monter car la demande est élevée.'
    },
    {
      title: 'Pourquoi Trader des Actions?',
      description: 'Les gens tradent des actions pour potentiellement gagner de l\'argent. La stratégie de base est d\'acheter bas et de vendre haut.',
      example: 'Acheter Amazon à 100$, vendre à 120$ = profit de 20$ par action!'
    }
  ],

  2: [
    {
      title: 'Bougie Verte = Prix en Hausse',
      description: 'Une bougie verte (ou blanche) signifie que le prix de clôture était PLUS ÉLEVÉ que le prix d\'ouverture.',
      example: 'Action ouverte à 50$, fermée à 55$ → Bougie verte montrant une hausse de 5$'
    },
    {
      title: 'Bougie Rouge = Prix en Baisse',
      description: 'Une bougie rouge (ou noire) signifie que le prix de clôture était PLUS BAS que le prix d\'ouverture.',
      example: 'Action ouverte à 60$, fermée à 55$ → Bougie rouge montrant une baisse de 5$'
    },
    {
      title: 'Les Mèches Montrent les Hauts et Bas',
      description: 'Les lignes fines (mèches) en haut et en bas montrent les prix les plus hauts et les plus bas pendant cette période.',
      example: 'Une bougie avec une longue mèche supérieure signifie que le prix est monté haut mais est redescendu'
    }
  ],

  3: [
    {
      title: 'Types d\'Ordres',
      description: 'Il existe différents types d\'ordres : ordre au marché (exécution immédiate) et ordre à cours limité (attendre un prix spécifique).',
      example: 'Ordre au marché : achat immédiat au prix actuel. Ordre limité : achat uniquement si le prix atteint 100$.'
    },
    {
      title: 'Stop-Loss Protège',
      description: 'Un stop-loss est un ordre qui vend automatiquement si le prix descend trop bas, limitant tes pertes.',
      example: 'Acheter à 100$ avec stop-loss à 95$ = perte maximale limitée à 5$'
    }
  ],

  4: [
    {
      title: 'Support = Plancher',
      description: 'Le support est un niveau de prix où l\'action tend à arrêter de descendre. Pense à ça comme un plancher.',
      example: 'Si une action rebondit toujours autour de 100$, c\'est un niveau de support'
    },
    {
      title: 'Résistance = Plafond',
      description: 'La résistance est un niveau de prix où l\'action tend à arrêter de monter. Pense à ça comme un plafond.',
      example: 'Si une action redescend toujours autour de 150$, c\'est un niveau de résistance'
    },
    {
      title: 'Les Cassures Sont Importantes',
      description: 'Quand le prix casse le support ou la résistance, cela peut signaler un gros mouvement.',
      example: 'Action casse au-dessus de 150$ (résistance) → Peut monter jusqu\'à 170$+'
    }
  ],

  5: [
    {
      title: 'Gérer les Risques',
      description: 'La gestion des risques est essentielle. Ne jamais risquer plus que ce que tu peux te permettre de perdre.',
      example: 'Risquer maximum 1-2% de ton capital par trade est une bonne règle'
    },
    {
      title: 'Ratio Risque/Récompense',
      description: 'Un bon ratio est de risquer 1$ pour gagner au moins 2$ ou 3$. Ça compense les pertes inévitables.',
      example: 'Stop-loss à 95$ (risque 5$), take-profit à 110$ (gain 15$) = ratio de 1:3'
    }
  ],

  6: [
    {
      title: 'Patterns de Retournement',
      description: 'Les patterns de retournement indiquent que la tendance actuelle va probablement changer de direction.',
      example: 'Un double sommet peut indiquer qu\'une hausse est sur le point de se terminer'
    }
  ],

  7: [
    {
      title: 'Patterns de Continuation',
      description: 'Les patterns de continuation suggèrent que la tendance actuelle va continuer, permettant de rester dans des positions gagnantes.',
      example: 'Un triangle ascendant suggère que la hausse va continuer'
    }
  ],

  8: [
    {
      title: 'Indicateurs Techniques',
      description: 'Les indicateurs comme les moyennes mobiles, RSI, MACD aident à confirmer les signaux et améliorer tes entrées.',
      example: 'RSI au-dessus de 70 = sur-achat, RSI en-dessous de 30 = sur-vente'
    }
  ]
};
