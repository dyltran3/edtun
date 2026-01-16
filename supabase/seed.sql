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

-- ========================================
-- STRUCTURED CURRICULUM LESSONS
-- Framework: [SUBJECT]-[GRADE]-[TOPIC]-[PRIORITY]-[STT]
-- Inserted: 2026-01-16
-- ========================================

-- Math (MTH) - Grade 10 (High Priority = 'H')
INSERT INTO public.lessons (id, course_id, title, description, order_index, subject, grade, topic, priority, sequence_number, lesson_code, points, theory_content)
VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Mệnh đề & Tập hợp', 'Các phép toán tập hợp, sơ đồ Ven, các tập hợp số', 1, 'MTH', 10, 'ALG', 'H', 1, 'MTH-10-ALG-H-01', 10, '{"type": "theory", "content": "Ngoài toán học, các phép toán tập hợp là nền tảng của lôgic, ngôn ngữ lập trình và khoa học máy tính."}'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Hàm số bậc hai & Đồ thị', 'Khảo sát biến thiên, vẽ Parabol, dấu tam thức bậc hai', 2, 'MTH', 10, 'FUN', 'H', 2, 'MTH-10-FUN-H-02', 10, '{"type": "theory", "content": "Hàm số bậc hai có ứng dụng rộng rãi trong vật lý (chuyển động ném, quỹ đạo) và kinh tế (tối ưu hóa lợi nhuận)."}'),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Vector & Hệ trục tọa độ', 'Tổng/hiệu vector, tích vô hướng, ứng dụng trong vật lý', 3, 'MTH', 10, 'GEO', 'H', 3, 'MTH-10-GEO-H-03', 10, '{"type": "theory", "content": "Vector là công cụ mạnh để biểu diễn lực, vận tốc, gia tốc trong không gian ba chiều."}'),
  ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Thống kê mô tả', 'Số trung bình, trung vị, phương sai, độ lệch chuẩn', 4, 'MTH', 10, 'STA', 'H', 4, 'MTH-10-STA-H-04', 10, '{"type": "theory", "content": "Thống kê mô tả là bước đầu tiên trong phân tích dữ liệu, giúp hiểu rõ đặc điểm của tập dữ liệu."}'),
  ('20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'Bất đẳng thức & Giải bất phương trình', 'Bất đẳng thức Cauchy, phương pháp biến đổi', 5, 'MTH', 10, 'ALG', 'M', 1, 'MTH-10-ALG-M-01', 8, '{"type": "theory", "content": "Bất đẳng thức là công cụ chứng minh và tối ưu hóa trong toán học."}'),
  ('20000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', 'Hệ phương trình & Phương trình bậc cao', 'Giải hệ phương trình bằng thế, cộng đại số; phương trình bậc ba, bậc bốn', 6, 'MTH', 10, 'ALG', 'M', 2, 'MTH-10-ALG-M-02', 8, '{"type": "theory", "content": "Hệ phương trình mô hình hóa các bài toán thực tế với nhiều ẩn số."}')
ON CONFLICT DO NOTHING;

-- Math (MTH) - Grade 11 (High Priority = 'H')
INSERT INTO public.lessons (id, course_id, title, description, order_index, subject, grade, topic, priority, sequence_number, lesson_code, points, theory_content)
VALUES
  ('20000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', 'Hàm số Lượng giác & Phương trình', 'Đường tròn lượng giác, công thức cộng/nhân đôi, phương trình cơ bản', 1, 'MTH', 11, 'ALG', 'H', 1, 'MTH-11-ALG-H-01', 10, '{"type": "theory", "content": "Lượng giác là nền tảng của phân tích sóng, dao động và các hiện tượng tuần hoàn trong vật lý."}'),
  ('20000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', 'Giới hạn & Hàm số liên tục', 'Giới hạn dãy số, giới hạn hàm số, định nghĩa đạo hàm', 2, 'MTH', 11, 'CAL', 'H', 2, 'MTH-11-CAL-H-02', 10, '{"type": "theory", "content": "Giới hạn là cầu nối quan trọng nhất để hiểu đạo hàm và tích phân. Đây là khái niệm cốt lõi của giải tích."}'),
  ('20000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000001', 'Tổ hợp & Xác suất', 'Quy tắc đếm, Hoán vị - Chỉnh hợp - Tổ hợp, Biến cố', 3, 'MTH', 11, 'ALG', 'H', 3, 'MTH-11-ALG-H-03', 10, '{"type": "theory", "content": "Xác suất là ngôn ngữ của bất định, được dùng rộng rãi trong khoa học dữ liệu, tài chính và quản lý rủi ro."}'),
  ('20000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'Quan hệ vuông góc trong không gian', 'Đường vuông góc mặt, góc giữa đường và mặt, khoảng cách', 4, 'MTH', 11, 'GEO', 'H', 4, 'MTH-11-GEO-H-04', 10, '{"type": "theory", "content": "Hình học không gian đòi hỏi tư duy hình ảnh mạnh mẽ và là nền tảng cho phương pháp Oxyz ở lớp 12."}'),
  ('20000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'Đạo hàm & Ứng dụng', 'Định nghĩa đạo hàm, công thức đạo hàm, quy tắc chuỗi', 5, 'MTH', 11, 'CAL', 'M', 1, 'MTH-11-CAL-M-01', 8, '{"type": "theory", "content": "Đạo hàm đo tốc độ thay đổi và là công cụ chính để phân tích hàm số."}'),
  ('20000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', 'Cấp số cộng & Cấp số nhân', 'Dãy số, công sai, công bội, tổng n số hạng', 6, 'MTH', 11, 'ALG', 'M', 2, 'MTH-11-ALG-M-02', 8, '{"type": "theory", "content": "Dãy số là công cụ để mô hình hóa sự tăng trưởng theo cấp số (tuyến tính hoặc hàm mũ)."}')
ON CONFLICT DO NOTHING;

-- Math (MTH) - Grade 12 (High Priority = 'H')
INSERT INTO public.lessons (id, course_id, title, description, order_index, subject, grade, topic, priority, sequence_number, lesson_code, points, theory_content)
VALUES
  ('20000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000001', 'Ứng dụng Đạo hàm khảo sát hàm số', 'Đơn điệu, Cực trị, Tiệm cận, Min/Max. Chiếm 30-40% đề thi', 1, 'MTH', 12, 'CAL', 'H', 1, 'MTH-12-CAL-H-01', 10, '{"type": "theory", "content": "Khảo sát hàm số là kỹ năng cốt lõi giúp hiểu bản chất hàm số và có ứng dụng rộng rãi."}'),
  ('20000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000001', 'Nguyên hàm & Tích phân', 'Các phương pháp tính tích phân, ứng dụng tính diện tích/thể tích', 2, 'MTH', 12, 'CAL', 'H', 2, 'MTH-12-CAL-H-02', 10, '{"type": "theory", "content": "Tích phân là phép toán ngược của đạo hàm và có ứng dụng trong tính toán diện tích, thể tích, công."}'),
  ('20000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000001', 'Phương pháp tọa độ trong không gian (Oxyz)', 'Phương trình mặt phẳng, đường thẳng, mặt cầu', 3, 'MTH', 12, 'GEO', 'H', 3, 'MTH-12-GEO-H-03', 10, '{"type": "theory", "content": "Oxyz biến hình học thành đại số, cho phép giải các bài toán không gian một cách hệ thống."}'),
  ('20000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000001', 'Số phức', 'Các phép toán số phức, biểu diễn hình học, phương trình bậc hai hệ số thực', 4, 'MTH', 12, 'ALG', 'H', 4, 'MTH-12-ALG-H-04', 10, '{"type": "theory", "content": "Số phức mở rộng khái niệm số và là nền tảng của kỹ thuật điện xoay chiều."}'),
  ('20000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000001', 'Logarit & Hàm số mũ', 'Hàm số mũ, hàm số logarit, phương trình và bất phương trình', 5, 'MTH', 12, 'FUN', 'M', 1, 'MTH-12-FUN-M-01', 8, '{"type": "theory", "content": "Hàm mũ và logarit mô hình hóa sự tăng trưởng và suy giảm theo hàm mũ (dân số, phóng xạ)."}'),
  ('20000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000001', 'Xác suất nâng cao', 'Biến ngẫu nhiên, phân phối xác suất, kỳ vọng toán học', 6, 'MTH', 12, 'STA', 'M', 1, 'MTH-12-STA-M-01', 8, '{"type": "theory", "content": "Phân phối xác suất là công cụ cơ bản của thống kê suy luận."}')
ON CONFLICT DO NOTHING;

-- Physics (PHY) - Grade 10 (High Priority = 'H')
INSERT INTO public.lessons (id, course_id, title, description, order_index, subject, grade, topic, priority, sequence_number, lesson_code, points, theory_content)
VALUES
  ('20000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000002', 'Động học chất điểm', 'Chuyển động thẳng đều/biến đổi đều, đồ thị độ dịch chuyển - thời gian', 1, 'PHY', 10, 'MEC', 'H', 1, 'PHY-10-MEC-H-01', 10, '{"type": "theory", "content": "Động học là nền tảng của cơ học cổ điển, mô tả cách thức vật thể chuyển động."}'),
  ('20000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000002', 'Ba định luật Newton & Các lực cơ học', 'Định luật II Newton (F=ma), Lực ma sát, Lực đàn hồi', 2, 'PHY', 10, 'DYN', 'H', 2, 'PHY-10-DYN-H-02', 10, '{"type": "theory", "content": "Định luật Newton là nền tảng của cơ học, giải thích mối quan hệ giữa lực và chuyển động."}'),
  ('20000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000002', 'Năng lượng, Công & Công suất', 'Động năng, Thế năng, Định luật bảo toàn cơ năng', 3, 'PHY', 10, 'ENE', 'H', 3, 'PHY-10-ENE-H-03', 10, '{"type": "theory", "content": "Năng lượng là khái niệm toàn cầu trong vật lý, giải thích cách mà vũ trụ hoạt động."}'),
  ('20000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000002', 'Động lượng & Va chạm', 'Bảo toàn động lượng, va chạm mềm/đàn hồi', 4, 'PHY', 10, 'MEC', 'H', 4, 'PHY-10-MEC-H-04', 10, '{"type": "theory", "content": "Động lượng là đại lượng bảo toàn cơ bản, ứng dụng trong va chạm và tên lửa."}'),
  ('20000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000002', 'Chuyển động tròn đều', 'Tốc độ dài, vận tốc góc, gia tốc hướng tâm', 5, 'PHY', 10, 'MEC', 'M', 1, 'PHY-10-MEC-M-01', 8, '{"type": "theory", "content": "Chuyển động tròn là trường hợp đặc biệt của chuyển động, có ứng dụng trong vệ tinh và các máy quay."}'),
  ('20000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000002', 'Chất lưu & Áp suất', 'Áp suất chất lỏng, nguyên lý Pascal, định luật Archimedes', 6, 'PHY', 10, 'FLU', 'M', 1, 'PHY-10-FLU-M-01', 8, '{"type": "theory", "content": "Chất lưu bao gồm chất lỏng và chất khí, có ứng dụng trong máy bơm, con tàu ngầm, máy bay."}')
ON CONFLICT DO NOTHING;

-- Physics (PHY) - Grade 11 (High Priority = 'H')
INSERT INTO public.lessons (id, course_id, title, description, order_index, subject, grade, topic, priority, sequence_number, lesson_code, points, theory_content)
VALUES
  ('20000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000002', 'Dao động điều hòa', 'Phương trình dao động, Con lắc lò xo, Con lắc đơn', 1, 'PHY', 11, 'OSC', 'H', 1, 'PHY-11-OSC-H-01', 10, '{"type": "theory", "content": "Dao động điều hòa là chuyển động lặp đi lặp lại, có ứng dụng trong nhạc, địa chấn, kỹ thuật."}'),
  ('20000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000002', 'Sóng cơ & Giao thoa sóng', 'Sự truyền sóng, Giao thoa, Sóng dừng', 2, 'PHY', 11, 'WAV', 'H', 2, 'PHY-11-WAV-H-02', 10, '{"type": "theory", "content": "Sóng cơ là sự truyền năng lượng qua chất đàn hồi, là cơ sở của âm thanh và sóng nước."}'),
  ('20000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000002', 'Điện trường & Tụ điện', 'Cường độ điện trường, Định luật Coulomb, Năng lượng tụ điện', 3, 'PHY', 11, 'ELE', 'H', 3, 'PHY-11-ELE-H-03', 10, '{"type": "theory", "content": "Điện trường là sự biểu hiện của tương tác điện từ, là nền tảng của điện học."}'),
  ('20000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000002', 'Dòng điện không đổi (DC Circuits)', 'Định luật Ohm toàn mạch, Nguồn điện, Công suất điện', 4, 'PHY', 11, 'CIR', 'H', 4, 'PHY-11-CIR-H-04', 10, '{"type": "theory", "content": "Mạch điện DC là nền tảng của các ứng dụng điện tử, từ pin đến các thiết bị điện tử."}'),
  ('20000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000002', 'Từ trường tĩnh', 'Từ trường, Lực từ, Cảm ứng từ', 5, 'PHY', 11, 'MAG', 'M', 1, 'PHY-11-MAG-M-01', 8, '{"type": "theory", "content": "Từ trường là sự biểu hiện khác của tương tác điện từ, có ứng dụng trong máy biến áp, động cơ."}'),
  ('20000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000002', 'Tia sáng & Quang học hình học', 'Định luật phản xạ, khúc xạ, thấu kính, gương cong', 6, 'PHY', 11, 'OPT', 'M', 1, 'PHY-11-OPT-M-01', 8, '{"type": "theory", "content": "Quang học hình học mô tả chuyển động của ánh sáng qua các hệ thống quang học."}')
ON CONFLICT DO NOTHING;

-- Physics (PHY) - Grade 12 (High Priority = 'H')
INSERT INTO public.lessons (id, course_id, title, description, order_index, subject, grade, topic, priority, sequence_number, lesson_code, points, theory_content)
VALUES
  ('20000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000002', 'Vật lý nhiệt & Khí lý tưởng', 'Nội năng, Các định luật nhiệt động lực học, Phương trình Claperon-Mendeleev', 1, 'PHY', 12, 'THE', 'H', 1, 'PHY-12-THE-H-01', 10, '{"type": "theory", "content": "Vật lý nhiệt giải thích cách mà nhiệt năng chuyển hóa thành công học, là nền tảng của máy nhiệt."}'),
  ('20000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000002', 'Từ trường & Cảm ứng điện từ', 'Lực từ, Từ thông, Định luật Faraday', 2, 'PHY', 12, 'MAG', 'H', 2, 'PHY-12-MAG-H-02', 10, '{"type": "theory", "content": "Cảm ứng điện từ là hiện tượng cơ bản cho phép chuyển đổi năng lượng cơ học thành năng lượng điện."}'),
  ('20000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000002', 'Dòng điện xoay chiều (AC Circuits)', 'Mạch RLC nối tiếp, Cộng hưởng điện, Máy biến áp', 3, 'PHY', 12, 'AC', 'H', 3, 'PHY-12-AC-H-03', 10, '{"type": "theory", "content": "Dòng điện xoay chiều là cơ sở của hệ thống điện lưới cung cấp điện cho nhà cửa và công nghiệp."}'),
  ('20000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000002', 'Vật lý hạt nhân', 'Cấu tạo hạt nhân, Phóng xạ, Phản ứng phân hạch/nhiệt hạch', 4, 'PHY', 12, 'NUC', 'H', 4, 'PHY-12-NUC-H-04', 10, '{"type": "theory", "content": "Vật lý hạt nhân giải thích cấu tạo chất và là nền tảng của năng lượng hạt nhân."}'),
  ('20000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000002', 'Sóng ánh sáng & Hiệu ứng quang điện', 'Bản chất sóng - hạt của ánh sáng, Hiệu ứng quang điện, Photon', 5, 'PHY', 12, 'QUA', 'M', 1, 'PHY-12-QUA-M-01', 8, '{"type": "theory", "content": "Bản chất sóng - hạt của ánh sáng là một trong những khám phá đột phá của vật lý hiện đại."}'),
  ('20000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000002', 'Vật lý nguyên tử', 'Mô hình Bohr, Mức năng lượng, Phổ nguyên tử', 6, 'PHY', 12, 'ATO', 'M', 1, 'PHY-12-ATO-M-01', 8, '{"type": "theory", "content": "Mô hình Bohr và lý thuyết lượng tử giải thích cấu tạo của nguyên tử."}')
ON CONFLICT DO NOTHING;


