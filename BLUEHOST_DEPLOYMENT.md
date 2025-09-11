# 🌐 Bluehost 部署指南 - jasonxw.com/coinlist

## 📋 方案选择

### 🎯 方案1：Netlify + 自定义域名 (推荐 - 最简单)

#### 步骤1：在 Netlify 设置自定义域名
1. 登录 Netlify 仪表板
2. 进入你的 `coinlist` 项目
3. 点击 **"Domain settings"**
4. 点击 **"Add custom domain"**
5. 输入：`coinlist.jasonxw.com`
6. 记录 Netlify 提供的 DNS 信息

#### 步骤2：在 Bluehost 配置子域名
1. 登录 [Bluehost cPanel](https://my.bluehost.com/)
2. 找到 **"Domains"** → **"Zone Editor"**
3. 选择 `jasonxw.com` 域名
4. 添加 CNAME 记录：
   ```
   Name: coinlist
   Type: CNAME
   Points to: your-site-name.netlify.app
   TTL: 14400
   ```
5. 保存更改（可能需要几小时生效）

### 🎯 方案2：直接上传到 Bluehost

#### 步骤1：构建生产版本
```bash
npm run build
```

#### 步骤2：通过 File Manager 上传
1. 登录 Bluehost cPanel
2. 打开 **"File Manager"**
3. 导航到 `public_html/`
4. 创建文件夹 `coinlist`
5. 进入 `coinlist` 文件夹
6. 上传 `build` 文件夹中的所有内容

#### 步骤3：配置 .htaccess（重要！）
在 `public_html/coinlist/` 创建 `.htaccess` 文件：
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

# Enable Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### 🎯 方案3：使用 FTP 上传（如果熟悉 FTP）

#### 步骤1：构建项目
```bash
npm run build
```

#### 步骤2：FTP 配置
- **主机**: ftp.jasonxw.com 或你的 Bluehost IP
- **用户名**: 你的 Bluehost 用户名
- **密码**: 你的 Bluehost 密码
- **目录**: `/public_html/coinlist/`

#### 步骤3：上传文件
1. 连接到 FTP
2. 导航到 `/public_html/coinlist/`
3. 上传 `build` 文件夹中的所有内容
4. 确保上传 `.htaccess` 文件

## 🔧 配置注意事项

### Environment Variables (如果使用 Firebase)
如果你的应用使用 Firebase，需要在构建前设置环境变量：

创建 `.env.production` 文件：
```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 子目录配置
由于应用将在 `/coinlist/` 子目录运行，我已经在 `package.json` 中添加了：
```json
"homepage": "https://jasonxw.com/coinlist"
```

## 🚀 自动化部署 (可选)

如果你想要自动化部署，可以：

1. **GitHub Actions** - 自动构建并 FTP 上传
2. **Netlify** - 仍然使用 Netlify，但配置自定义域名
3. **Webhooks** - Bluehost 可能支持 Git webhooks

## 📋 部署检查清单

部署后请检查：
- [ ] `https://jasonxw.com/coinlist/` 能正常访问
- [ ] 加密货币数据正常加载
- [ ] 分页功能正常
- [ ] 主题切换正常
- [ ] API 调用正常工作
- [ ] 路由在刷新后仍然正常
- [ ] 移动设备响应式正常

## 🔗 推荐方案总结

1. **最简单**: Netlify + 子域名 (coinlist.jasonxw.com)
2. **最灵活**: 直接 Bluehost 文件上传
3. **最专业**: 自动化 CI/CD 流程

选择适合你的方案！需要帮助设置任何一种方案，请告诉我。
