# 🚀 Deploy Guide - CheapDeals to Render

## ❌ **Lỗi gặp phải:**
```
==> Publish directory build does not exist!
==> Build failed 😞
```

**Nguyên nhân**: Render tìm thư mục `build` nhưng Vite tạo ra thư mục `dist`

## ✅ **Các cách sửa lỗi:**

### **Phương pháp 1: Cập nhật Render Settings (Nhanh nhất)**

1. **Vào Render Dashboard** → Chọn service `cheapdeals`
2. **Settings** → **Build & Deploy**
3. **Publish Directory**: Đổi từ `build` thành `dist`
4. **Save Changes**
5. **Manual Deploy**

### **Phương pháp 2: Sử dụng render.yaml (Khuyến nghị)**

File `render.yaml` đã được tạo:
```yaml
services:
  - type: web
    name: cheapdeals
    env: static
    buildCommand: npm install && npm run build:render
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

**Cách sử dụng:**
1. Commit file `render.yaml` lên GitHub
2. Render sẽ tự động detect và sử dụng config này
3. Deploy lại

### **Phương pháp 3: Script build tùy chỉnh**

`package.json` đã được cập nhật:
```json
{
  "scripts": {
    "build": "vite build && cp -r dist build",
    "build:render": "vite build"
  }
}
```

**Cách sử dụng:**
- `npm run build`: Tạo cả `dist` và `build` folder
- `npm run build:render`: Chỉ tạo `dist` folder

## 🔧 **Render Settings khuyến nghị:**

### **Build Settings:**
- **Build Command**: `npm install && npm run build:render`
- **Publish Directory**: `dist`
- **Node Version**: `22.16.0` (hoặc latest)

### **Environment Variables:**
```
NODE_ENV=production
```

### **Advanced Settings:**
- **Auto-Deploy**: `Yes`
- **Branch**: `master` hoặc `main`

## 📁 **Cấu trúc sau khi build:**

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
├── background.png
└── phone-vibrate.png
```

## 🚀 **Steps để deploy thành công:**

### **Option A: Sử dụng render.yaml (Khuyến nghị)**
1. Commit tất cả changes lên GitHub:
   ```bash
   git add .
   git commit -m "Add render.yaml and fix build config"
   git push origin master
   ```

2. Render sẽ tự động deploy với config mới

### **Option B: Manual settings**
1. Vào Render Dashboard
2. Settings → Build & Deploy
3. **Build Command**: `npm install && npm run build:render`
4. **Publish Directory**: `dist`
5. Save và Manual Deploy

## ✅ **Kết quả mong đợi:**

```
==> Running build command 'npm install && npm run build:render'...
==> Build completed successfully
==> Deploying to Render...
==> Your service is live at https://cheapdeals.onrender.com
```

## 🔍 **Troubleshooting:**

### **Nếu vẫn lỗi:**
1. **Check Build Logs**: Xem chi tiết lỗi trong Render logs
2. **Clear Cache**: Settings → Clear build cache
3. **Manual Deploy**: Trigger manual deploy
4. **Check Assets**: Đảm bảo `background.png` và `phone-vibrate.png` có trong `public/`

### **Common Issues:**
- **404 on refresh**: Đã fix với routes rewrite trong `render.yaml`
- **Assets not loading**: Check public folder structure
- **Build timeout**: Optimize dependencies

## 🎯 **Final Check:**
- ✅ `render.yaml` committed
- ✅ `package.json` updated
- ✅ `vite.config.js` optimized
- ✅ Assets in `public/` folder
- ✅ All changes pushed to GitHub

**Deploy sẽ thành công với config mới!** 🚀
