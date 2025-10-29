# 🌴 Travel Landing Page

Ứng dụng landing page cho công ty du lịch với admin panel quản lý tours.

## ✨ Tính năng

- 🏠 Trang chủ hiển thị tours theo khu vực
- 📝 Admin panel quản lý tours (CRUD)
- 🔄 Đồng bộ dữ liệu real-time giữa các thiết bị (Firebase Firestore)
- 📱 Responsive design
- 🎨 UI/UX hiện đại với Ant Design

## 🚀 Quick Start

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

### 3. Build cho production

```bash
npm run build
```

## 🔥 Thiết lập Firebase (Tùy chọn)

Để đồng bộ dữ liệu giữa các máy trên Vercel:

1. Xem hướng dẫn chi tiết: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
2. Tạo file `.env` từ `.env.example` và điền Firebase config
3. Thêm environment variables vào Vercel
4. Redeploy project

**Lưu ý**: Nếu không thiết lập Firebase, app sẽ tự động dùng localStorage (chỉ lưu trên browser local).

## 📁 Cấu trúc Project

```
src/
├── components/        # Reusable components
├── contexts/         # React contexts
├── data/             # Data management (Firestore/localStorage)
├── hooks/            # Custom hooks
├── pages/            # Page components
└── services/         # Firebase configuration
```

## 🛠️ Tech Stack

- **React** + **TypeScript** + **Vite**
- **Ant Design** - UI components
- **Firebase Firestore** - Cloud database (optional)
- **React Router** - Routing

## 📖 Usage

### Admin Panel

1. Truy cập `/admin`
2. Thêm/Sửa/Xóa tours
3. Upload hình ảnh
4. Export/Import dữ liệu

### User Pages

- `/` - Trang chủ
- `/region/:region` - Tours theo khu vực
- `/tour/:slug` - Chi tiết tour
- `/about` - Giới thiệu
- `/contact` - Liên hệ

## 🚢 Deploy

### Vercel (Recommended)

```bash
vercel deploy
```

## 📝 Environment Variables

Tạo file `.env`:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## 🔧 Development

- Dev server: `http://localhost:5173`
- Build output: `dist/`

## 📄 License

MIT 
