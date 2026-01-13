-- Demo courses
insert into public.courses (id, title, description, mode, category, level, thumbnail_url, is_published)
values
  ('00000000-0000-0000-0000-000000000001', 'Vật Lý: Rơi Tự Do', 'Hiểu rơi tự do qua mô phỏng và code', 'academic', 'physics', 'beginner', null, true),
  ('00000000-0000-0000-0000-000000000002', 'Build a Todo App', 'Dự án web đơn giản với CRUD', 'project', 'programming', 'intermediate', null, true)
on conflict (id) do nothing;

-- Demo lessons
insert into public.lessons (id, course_id, title, description, order_index, starter_code, points)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Chuyển động rơi tự do', 'Mô phỏng rơi tự do với p5.js', 1, '# Starter code rơi tự do', 10),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Thiết kế schema', 'Chuẩn bị database cho Todo', 1, '# Starter code todo', 10)
on conflict (id) do nothing;

