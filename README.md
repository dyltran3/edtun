# Ed-Tun STEM

> **Nền tảng Giáo dục Tương tác & Tư duy Khởi nghiệp Thực chiến**

[![Status](https://img.shields.io/badge/status-MVP%20Development-orange)]()
[![Progress](https://img.shields.io/badge/progress-Week%202%2F4-blue)]()
[![License](https://img.shields.io/badge/license-Proprietary-red)]()

## 🎯 Tổng Quan

Ed-Tun STEM là một nền tảng EdTech đột phá, giải quyết các hạn chế của giáo dục STEM truyền thống bằng cách kết hợp trực quan hóa tương tác (Interactive Visualization), lập trình thực chiến và tư duy khởi nghiệp.

### Slogan
**"Học để Hiểu"** - Biến công thức khô khan thành trải nghiệm học tập sống động

## 🎓 Đối Tượng & Mô Hình

### Academic Mode (Hàn lâm)
- **Đối tượng**: Học sinh K-12
- **Nội dung**: Toán, Lý, Anh theo chuẩn chương trình giáo dục
- **Phương pháp**: Mô phỏng tương tác và trực quan hóa

### Project/Startup Mode (Thực chiến)
- **Đối tượng**: Sinh viên CNTT và các nhà sáng lập tương lai
- **Nội dung**: Học thông qua xây dựng dự án thực tế
- **Phương pháp**: Kết hợp kỹ năng lập trình với kỹ năng quản trị doanh nghiệp

## 💡 Vấn Đề & Giải Pháp

### Vấn Đề Hiện Tại
- ❌ **Học vẹt**: Ghi nhớ công thức mà không hiểu bản chất
- ❌ **Thiếu thực hành**: Không có môi trường xây dựng sản phẩm thực tế
- ❌ **Rào cản ngôn ngữ**: Khó tiếp cận tài liệu kỹ thuật quốc tế

### Giải Pháp Ed-Tun
- ✅ **Visual Sync**: Đồng bộ code và mô phỏng theo thời gian thực
- ✅ **Client-Side Execution**: Chạy code Python/Web ngay trên trình duyệt
- ✅ **AI-Powered**: Trợ lý học tập cá nhân hóa với Gemini AI

## 🏗️ Kiến Trúc Kỹ Thuật

### Tech Stack

#### Frontend (Client-Side)
```
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Zustand (State Management)
```

#### Code Execution Engines
```
- Monaco Editor (Code Editor)
- Pyodide (Python WebAssembly)
- Sandpack (Web Sandbox)
- p5.js (Graphics & Simulation)
```

#### Backend & Services
```
- Vercel (Hosting)
- Supabase (PostgreSQL, Auth, Storage)
- Google Gemini API (AI Assistant)
```

### Kiến Trúc Serverless

Dự án áp dụng triết lý **Serverless** và **Client-Side First** để:
- ⚡ Tối ưu hiệu năng
- 💰 Chi phí vận hành ban đầu = 0
- 📈 Khả năng mở rộng cao

## ✨ Tính Năng Cốt Lõi

### 1. Interactive Split-Screen Sandbox
Giao diện chia đôi màn hình có thể thay đổi kích thước:
- **Bên trái**: Lý thuyết hoặc Mô phỏng tương tác
- **Bên phải**: Code Editor và Console kết quả

### 2. Visual Sync Mechanism
Cơ chế đồng bộ tham số giữa Code Editor và khung mô phỏng p5.js - thay đổi code, mô phỏng cập nhật tức thì.

### 3. Hệ Thống Bài Học Đa Dạng
- **Lessons**: Cấu trúc bài học lý thuyết cho Academic Mode
- **Milestones**: Cột mốc dự án cho Project Mode

## 🚀 Cài Đặt & Chạy Dự Án

### Prerequisites
```bash
Node.js >= 18.0.0
npm hoặc yarn
```

### Installation
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Cập nhật SUPABASE_URL, SUPABASE_ANON_KEY, GEMINI_API_KEY

# Run development server
npm run dev
```

Truy cập `http://localhost:3000` để xem ứng dụng.

## 📁 Cấu Trúc Database

### Tables
- **profiles**: Thông tin mở rộng user, gamification
- **courses**: Phân loại Academic/Project Mode
- **lessons**: Nội dung bài học chi tiết
- **milestones**: Cột mốc dự án
- **submissions**: Lưu trữ bài làm của học viên


## 👥 Đội Ngũ

- **Founder / Lead Developer**: [Tên của bạn]

## 📝 License

Proprietary - All rights reserved

## 📞 Liên Hệ

- **Email**: [dyltran3@gmail.com]
- **Website**: [coming soon]

