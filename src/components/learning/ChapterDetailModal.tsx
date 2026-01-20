import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowRight, Check, Lightbulb, X, FileText, Route, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALL_PATHS } from '@/data/pathOptions';
import { LearningPathType, getPathDisplayName } from '@/lib/learningPathLogic';
import { CHAPTER_TIPS } from '@/lib/lesson-tips';
import { CHAPTER_DEFINITIONS } from '@/data/chapters';
import { LessonWithProgress } from '@/types/lesson.types';

interface Chapter {
  id: number;
  number: number;
  title: string;
  color: string;
  description?: string;
}

interface ChapterDetailModalProps {
  chapter: Chapter | null;
  isOpen: boolean;
  onClose: () => void;
  currentPath?: LearningPathType;
  onPathChange?: (newPath: LearningPathType) => void;
  chapterLessons?: LessonWithProgress[];
}

export function ChapterDetailModal({ 
  chapter, 
  isOpen, 
  onClose, 
  currentPath = 'zero_to_hero',
  onPathChange,
  chapterLessons = []
}: ChapterDetailModalProps) {
  const [selectedPath, setSelectedPath] = useState<LearningPathType>(currentPath);
  const [activeTab, setActiveTab] = useState<'summary' | 'paths'>('summary');

  if (!chapter) return null;

  const currentColor = chapter.color || 'bg-green-600';
  
  // Calculate chapter progress
  const totalLessons = chapterLessons.length;
  const completedLessons = chapterLessons.filter(l => l.isCompleted).length;
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const handlePathChange = () => {
    if (onPathChange && selectedPath !== currentPath) {
      onPathChange(selectedPath);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden [&>button]:hidden">
        {/* Header style Duolingo - vert avec menu icon */}
        <div className={cn("p-6 text-white", currentColor)}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">
                  {chapter.title}
                </DialogTitle>
                <DialogDescription className="text-white/80 text-sm mt-1">
                  Résumé & Parcours
                </DialogDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold">
            CHAPITRE {chapter.number}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50 dark:bg-gray-900">
          <button
            onClick={() => setActiveTab('summary')}
            className={cn(
              "flex-1 py-3 px-4 font-semibold transition-colors flex items-center justify-center gap-2",
              activeTab === 'summary'
                ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            <FileText size={20} />
            <span>Résumé</span>
          </button>
          <button
            onClick={() => setActiveTab('paths')}
            className={cn(
              "flex-1 py-3 px-4 font-semibold transition-colors flex items-center justify-center gap-2",
              activeTab === 'paths'
                ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            <Route size={20} />
            <span>Parcours</span>
          </button>
        </div>

        <ScrollArea className="max-h-[50vh] pr-4">
          {activeTab === 'summary' ? (
            <div className="space-y-6 p-6">
              {/* Progress Bar */}
              {totalLessons > 0 && (
                <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Progression</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      {completedLessons}/{totalLessons} leçons
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={cn("h-2.5 rounded-full transition-all", currentColor)}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Chapter Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">À propos de ce chapitre</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {chapter.description || 
                    `Dans ce chapitre, vous allez apprendre les concepts fondamentaux de ${chapter.title.toLowerCase()}. 
                    Chaque leçon vous guidera étape par étape pour maîtriser ces concepts essentiels.`
                  }
                </p>
              </div>

              {/* Tips & Guide Section */}
              {CHAPTER_TIPS[chapter.number] && CHAPTER_TIPS[chapter.number].length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Tips & Guide
                  </h3>
                  <div className="space-y-4">
                    {CHAPTER_TIPS[chapter.number].map((tip, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border-l-4 border-blue-500"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <Lightbulb className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                              {tip.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                              {tip.description}
                            </p>
                            {tip.example && (
                              <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                                  Exemple:
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {tip.example}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Choisis un parcours d'apprentissage adapté à ton niveau:
              </p>

              {/* Current Path Info */}
              <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border-2 border-green-500 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {getPathDisplayName(currentPath)}
                  </span>
                  <Badge variant="default" className="bg-green-500">Actuel</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {ALL_PATHS.find(p => p.type === currentPath)?.description}
                </p>
              </div>

              {/* Available Paths */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Parcours disponibles</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Vous pouvez changer de parcours d'apprentissage à tout moment. Votre progression sera sauvegardée.
                </p>
              
              <div className="grid gap-3">
                {ALL_PATHS.map((path) => {
                  const isSelected = selectedPath === path.type;
                  const isCurrent = currentPath === path.type;
                  
                  return (
                    <button
                      key={path.type}
                      onClick={() => setSelectedPath(path.type)}
                      disabled={isCurrent}
                      className={cn(
                        "text-left p-4 rounded-lg border-2 transition-all",
                        isSelected && "border-primary bg-primary/5",
                        !isSelected && "border-border hover:border-primary/50",
                        isCurrent && "opacity-60 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{path.icon}</span>
                            <h4 className="font-semibold">{path.name}</h4>
                            {isCurrent && (
                              <Badge variant="secondary" className="text-xs">Actuel</Badge>
                            )}
                            {isSelected && !isCurrent && (
                              <Badge variant="default" className="text-xs">Sélectionné</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {path.description}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="text-muted-foreground">
                              {path.totalLessons} leçons
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                              {path.estimatedWeeks} semaines
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedPath !== currentPath && (
                <Button
                  onClick={handlePathChange}
                  className={cn("w-full mt-4", currentColor, "text-white hover:opacity-90")}
                  size="lg"
                >
                  Changer vers {getPathDisplayName(selectedPath)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Footer style Duolingo */}
        <div className="p-4 border-t bg-gray-50 dark:bg-gray-900">
          <Button
            onClick={onClose}
            className={cn("w-full py-3 font-bold rounded-xl transition-colors text-white hover:opacity-90", currentColor)}
            size="lg"
          >
            Compris!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
