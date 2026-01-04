// Script to seed initial lessons into the database
// Run this after migration

import { supabase } from '@/integrations/supabase/client';
import { module1Day1Lessons, lessonContentToJSONB } from '@/data/stockmasterLessons';

export async function seedModule1Day1() {
  const lessons = [
    {
      module_id: 1,
      day_number: 1,
      lesson_number: 1.1,
      title: 'Qu\'est-ce que le Trading?',
      description: 'Apprendre les bases de l\'achat et de la vente d\'actions',
      lesson_type: 'mixed',
      content_json: lessonContentToJSONB(module1Day1Lessons['lesson_1_1']),
      min_score_to_pass: 70,
      xp_reward: 10,
      coin_reward: 5,
      is_locked: false,
      unlock_requirement: null,
      estimated_duration_minutes: 5,
      level: 'beginner',
      order_index: 1
    },
    {
      module_id: 1,
      day_number: 1,
      lesson_number: 1.2,
      title: 'Comprendre les Actions',
      description: 'Découvrir ce que sont les actions et comment elles fonctionnent',
      lesson_type: 'mixed',
      content_json: lessonContentToJSONB(module1Day1Lessons['lesson_1_2']),
      min_score_to_pass: 70,
      xp_reward: 10,
      coin_reward: 5,
      is_locked: true,
      unlock_requirement: 'complete_lesson_1.1',
      estimated_duration_minutes: 5,
      level: 'beginner',
      order_index: 2
    }
  ];

  try {
    const { data, error } = await supabase
      .from('lessons')
      .insert(lessons)
      .select();

    if (error) {
      console.error('Error seeding lessons:', error);
      return { success: false, error };
    }

    console.log('Successfully seeded lessons:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error seeding lessons:', error);
    return { success: false, error };
  }
}

// To run this script, call: seedModule1Day1()

