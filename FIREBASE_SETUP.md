# 🔥 Hướng dẫn cài đặt Firebase để đồng bộ dữ liệu trên Vercel

## Vấn đề
Khi bạn push code lên Vercel, dữ liệu không đồng bộ giữa các máy khác nhau vì ứng dụng đang sử dụng localStorage (chỉ lưu trên trình duyệt của từng người).

## Giải pháp
Chúng ta đã tích hợp Firebase Firestore để lưu trữ dữ liệu trên cloud, giúp dữ liệu đồng bộ trên tất cả các máy.

---

## 📋 Các bước thiết lập

### 1. Tạo Firebase Project

1. Truy cập: https://console.firebase.google.com/
2. Click **"Add project"** hoặc chọn project hiện có
3. Điền tên project (VD: `travel-app`)
4. Tiếp tục các bước cho đến khi tạo xong project

### 2. Kích hoạt Firestore Database

1. Trong Firebase Console, chọn **Firestore Database** ở menu bên trái
2. Click **"Create database"**
3. Chọn chế độ **"Start in production mode"** hoặc **"Start in test mode"** (cho development)
4. Chọn location (chọn closest to Vietnam)
5. Click **"Enable"**

### 3. Lấy Firebase Config

1. Trong Firebase Console, click vào icon ⚙️ (Settings) > **Project settings**
2. Cuộn xuống phần **"Your apps"**, click **Web** icon `</>`
3. Copy các giá trị config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 4. Cấu hình biến môi trường

1. Tạo file `.env` trong thư mục gốc của project:

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

2. Mở file `.env` và điền các giá trị Firebase:

```env
VITE_FIREBASE_API_KEY=AIzaSyC... (value của apiKey)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

3. **QUAN TRỌNG**: Thêm `.env` vào Vercel:
   - Vào Vercel Dashboard
   - Chọn project của bạn
   - Vào **Settings** > **Environment Variables**
   - Thêm tất cả các biến từ file `.env`
   - Redeploy project

### 5. Cấu hình Firestore Rules (Optional)

Mở tab **Rules** trong Firestore và thêm rule để bảo vệ dữ liệu:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tours/{document=**} {
      allow read, write: if true; // Cho phép tất cả (cho development)
    }
  }
}
```

⚠️ **Lưu ý**: Trong production, bạn nên thêm authentication để bảo vệ dữ liệu.

### 6. Test ứng dụng

1. Chạy ứng dụng local:
```bash
npm run dev
```

2. Thêm một tour mới trong admin panel
3. Truy cập từ máy khác hoặc trình duyệt khác
4. Tour mới sẽ xuất hiện trên tất cả các thiết bị!

---

## 🎯 Cách hoạt động

### Hai chế độ lưu trữ:

1. **Firestore Mode**: Khi đã cấu hình Firebase, dữ liệu sẽ lưu trên cloud và đồng bộ real-time
2. **localStorage Mode**: Nếu chưa cấu hình Firebase, sẽ tự động dùng localStorage làm backup

### Fallback mechanism:
- Nếu Firestore không khả dụng, tự động chuyển về localStorage
- Dữ liệu vẫn được lưu và không bị mất

---

## 🔧 Troubleshooting

### Dữ liệu không đồng bộ?
1. Kiểm tra Firebase Console xem dữ liệu có được lưu không
2. Kiểm tra biến môi trường trên Vercel
3. Xem console log trong browser để debug

### Lỗi "Failed to save to Firestore"?
1. Kiểm tra Firestore rules có cho phép read/write không
2. Kiểm tra API key có đúng không
3. Kiểm tra network connection

### Backup dữ liệu cũ?
Ứng dụng có chức năng **Xuất/Nhập dữ liệu** trong admin panel để backup dữ liệu.

---

## 📊 Báo cáo

Sau khi thiết lập, bạn có thể:
- ✅ Admin upload tour từ máy A → thấy ngay trên máy B
- ✅ Dữ liệu tự động đồng bộ real-time
- ✅ Không mất dữ liệu khi xóa cache browser
- ✅ Backup/restore dữ liệu dễ dàng

---

## 💰 Firebase Free Tier

Firebase có free tier rất hào phóng:
- 50K reads/ngày
- 20K writes/ngày
- 20MB storage
- Đủ cho hầu hết các website travel

🎉 **Chúc bạn thiết lập thành công!**

