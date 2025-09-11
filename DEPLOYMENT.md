# 🚀 CoinList 部署指南

## 方法1：Netlify 部署 (推荐 - 最简单)

### 步骤1：准备代码
```bash
# 确保代码已提交并推送到 GitHub
git add .
git commit -m "🚀 Prepare for deployment"
git push origin main
```

### 步骤2：Netlify 部署
1. 访问 [Netlify](https://www.netlify.com/)
2. 点击 "Sign up" 或 "Log in"
3. 选择 "Import from Git"
4. 连接你的 GitHub 账户
5. 选择 `coinlist` 仓库
6. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
7. 点击 "Deploy site"

### 步骤3：环境变量配置 (如果你有 Firebase)
1. 在 Netlify 仪表板中，进入你的网站
2. 点击 "Site settings" → "Environment variables"
3. 添加以下变量：
   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```
4. 重新部署网站

---

## 方法2：Vercel 部署 (备选方案)

### 步骤1：安装 Vercel CLI
```bash
npm install -g vercel
```

### 步骤2：部署
```bash
vercel
```

### 步骤3：按照提示操作
- 选择项目目录
- 链接到现有项目或创建新项目
- 设置构建配置

---

## 方法3：GitHub Pages 部署

### 步骤1：安装 gh-pages
```bash
npm install --save-dev gh-pages
```

### 步骤2：更新 package.json
在 package.json 中添加：
```json
{
  "homepage": "https://hawk198723.github.io/coinlist",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 步骤3：部署
```bash
npm run deploy
```

---

## 🔧 部署后检查清单

- [ ] 网站正常加载
- [ ] API 调用正常工作
- [ ] 分页功能正常
- [ ] 主题切换工作
- [ ] Firebase 认证工作 (如果配置了)
- [ ] 价格警报功能正常
- [ ] 响应式设计在移动设备上正常

---

## 🌐 自定义域名 (可选)

### Netlify 自定义域名
1. 在 Netlify 仪表板中，进入 "Domain management"
2. 点击 "Add custom domain"
3. 输入你的域名
4. 按照DNS配置指示操作

### 免费域名建议
- `.tk`, `.ml`, `.ga` (Freenom)
- 或者使用 Netlify 提供的免费子域名

---

## 🎯 推荐工作流

1. **开发** → 本地测试 (`npm start`)
2. **测试** → 构建测试 (`npm run build`)
3. **部署** → 推送到 GitHub → 自动部署到 Netlify
4. **监控** → 检查网站性能和错误

---

## 📊 部署优化建议

- 启用 Gzip 压缩 ✅ (Netlify 自动)
- 启用 CDN ✅ (Netlify 自动)
- 设置适当的缓存头 ✅ (Netlify 自动)
- 启用 HTTPS ✅ (Netlify 自动)

你的应用现在已经准备好部署了！🚀
