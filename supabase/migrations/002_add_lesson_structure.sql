-- Add structured lesson fields for curriculum framework
-- Supports naming convention: [SUBJECT]-[GRADE]-[TOPIC]-[PRIORITY]-[STT]

ALTER TABLE lessons ADD COLUMN subject TEXT;
-- Examples: 'MTH' (Toán), 'PHY' (Vật Lý)

ALTER TABLE lessons ADD COLUMN grade INTEGER;
-- Values: 10, 11, 12

ALTER TABLE lessons ADD COLUMN topic TEXT;
-- Examples: 'ALG' (Đại số), 'GEO' (Hình học), 'MEC' (Cơ học)

ALTER TABLE lessons ADD COLUMN priority TEXT DEFAULT 'M';
-- Values: 'H' (High - Cốt lõi), 'M' (Medium - Mở rộng), 'L' (Low - Tham khảo)

ALTER TABLE lessons ADD COLUMN sequence_number INTEGER;
-- STT: 01, 02, 03... để sắp xếp thứ tự học

ALTER TABLE lessons ADD COLUMN lesson_code TEXT UNIQUE;
-- Composite code: [SUBJECT]-[GRADE]-[TOPIC]-[PRIORITY]-[STT]
-- Example: 'MTH-10-ALG-H-01'

-- Create indexes for efficient filtering and sorting
CREATE INDEX idx_lessons_subject_grade ON lessons(subject, grade);
CREATE INDEX idx_lessons_priority ON lessons(priority);
CREATE INDEX idx_lessons_topic ON lessons(topic);
CREATE INDEX idx_lessons_code ON lessons(lesson_code);
