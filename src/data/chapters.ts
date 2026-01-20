// Chapter definitions for learning paths

export interface Chapter {
  id: number;
  number: number;
  title: string;
  description: string;
  module_id: number;
}

export const CHAPTER_DEFINITIONS: Record<number, Chapter> = {
  1: {
    id: 1,
    number: 1,
    title: 'Fondamentaux du Trading',
    description: 'Apprenez les bases essentielles du trading d\'actions, y compris ce que sont les actions, comment fonctionne le marché boursier, et les concepts fondamentaux de l\'achat et de la vente.',
    module_id: 1,
  },
  2: {
    id: 2,
    number: 2,
    title: 'Lecture des Graphiques',
    description: 'Maîtrisez la lecture et l\'analyse des graphiques boursiers. Découvrez les différents types de graphiques, les bougies japonaises, et comment interpréter les mouvements de prix.',
    module_id: 2,
  },
  3: {
    id: 3,
    number: 3,
    title: 'Types d\'Ordres',
    description: 'Comprenez les différents types d\'ordres de trading : ordres au marché, ordres limités, stop-loss, et comment les utiliser efficacement pour exécuter vos stratégies.',
    module_id: 3,
  },
  4: {
    id: 4,
    number: 4,
    title: 'Support et Résistance',
    description: 'Identifiez les niveaux de support et de résistance sur les graphiques, des concepts clés pour déterminer les points d\'entrée et de sortie optimaux.',
    module_id: 4,
  },
  5: {
    id: 5,
    number: 5,
    title: 'Gestion des Risques',
    description: 'Apprenez à protéger votre capital avec des techniques de gestion des risques essentielles : position sizing, stop-loss, et calcul du risque/récompense.',
    module_id: 5,
  },
  6: {
    id: 6,
    number: 6,
    title: 'Patterns de Retournement',
    description: 'Reconnaissez les patterns de retournement de tendance qui indiquent des changements de direction potentiels du marché.',
    module_id: 6,
  },
  7: {
    id: 7,
    number: 7,
    title: 'Patterns de Continuation',
    description: 'Identifiez les patterns de continuation qui suggèrent que la tendance actuelle va se poursuivre, vous permettant de rester dans vos positions gagnantes.',
    module_id: 7,
  },
  8: {
    id: 8,
    number: 8,
    title: 'Indicateurs Techniques',
    description: 'Utilisez les indicateurs techniques populaires comme les moyennes mobiles, RSI, MACD, et autres outils pour affiner votre analyse technique.',
    module_id: 8,
  },
};

export function getChapterByModuleId(moduleId: number): Chapter | undefined {
  return CHAPTER_DEFINITIONS[moduleId];
}

export function getChapterTitle(moduleId: number): string {
  return CHAPTER_DEFINITIONS[moduleId]?.title || `Module ${moduleId}`;
}
