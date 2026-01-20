-- Vérifier si les badges ont été insérés
SELECT COUNT(*) as total_badges FROM badges WHERE monthly = true;

-- Voir quelques badges
SELECT id, name, icon, category, monthly 
FROM badges 
WHERE monthly = true 
ORDER BY category, requirement_value 
LIMIT 10;

-- Vérifier la structure de la table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'badges' 
AND table_schema = 'public';
