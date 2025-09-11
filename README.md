# 🚀 CoinList - Advanced Cryptocurrency Tracker

A modern, feature-rich cryptocurrency tracking application built with React, featuring real-time price data, user authentication, price alerts, and a beautiful responsive design.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.5.0-FFCA28?style=flat-square&logo=firebase)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=flat-square&logo=css3)
![CoinGecko](https://img.shields.io/badge/API-CoinGecko-8CC152?style=flat-square)

## ✨ Features

### 🔐 Authentication System
- **Firebase Authentication** - Secure user registration, login, and logout
- **User Session Management** - Persistent login state across browser sessions
- **Beautiful Auth Pages** - Modern, responsive authentication interface
- **Profile Management** - User profile display and management

### 💰 Cryptocurrency Tracking
- **Real-time Price Data** - Live feeds from CoinGecko API (free & reliable)
- **Beautiful Coin Icons** - High-quality cryptocurrency logos with hover effects
- **Interactive Watchlist** - Add/remove cryptocurrencies to your personal watchlist
- **Comprehensive Data** - Market cap, supply, rankings, and price changes
- **Smart Pagination** - Browse through thousands of cryptocurrencies (25/50/100 per page)

### 🚨 Price Alert System
- **Custom Price Targets** - Set personalized price alerts for any cryptocurrency
- **Smart Notifications** - Real-time alerts when target prices are reached
- **Flexible Frequency** - Choose one-time or repeated notifications
- **Alert Management** - Easy-to-use interface for managing all your alerts
- **Visual Indicators** - Alert counts and status displayed in the interface

### 🎨 Modern UI/UX
- **Dual Theme System** - Seamless dark/light mode toggle with system preference detection
- **Professional Design** - Clean, modern interface with smooth animations
- **Responsive Layout** - Perfect experience on desktop, tablet, and mobile devices
- **Interactive Elements** - Hover effects, transitions, and visual feedback
- **FontAwesome Icons** - Beautiful iconography throughout the interface

### 📊 Enhanced Data Display
- **Simplified Columns** - Focused on essential data (1h, 24h, 7d changes)
- **Color-coded Changes** - Visual green/red indicators for price movements
- **Formatted Numbers** - Easy-to-read number formatting with proper separators
- **Loading States** - Smooth loading animations and skeleton screens

### 🔧 Technical Excellence
- **Firebase Integration** - Backend-as-a-Service for authentication and data storage
- **Context API** - Clean global state management for themes, auth, and alerts
- **Smart API Switching** - Automatic fallback between CoinMarketCap and CoinGecko
- **Error Handling** - Robust error handling with user-friendly messages
- **Local Storage** - Persistent user preferences and alert data

## 🚀 Live Demo

Visit the live application: `http://localhost:3000` (when running locally)

## 📸 Screenshots

### 🌞 Light Theme - Main Dashboard
![Light Theme Dashboard](https://via.placeholder.com/800x500/ffffff/333333?text=Light+Theme+Dashboard+with+Coin+Icons)

### 🌙 Dark Theme - Main Dashboard
![Dark Theme Dashboard](https://via.placeholder.com/800x500/1a1a1a/e6edf3?text=Dark+Theme+Dashboard+with+Price+Alerts)

### 🔐 Authentication Pages
![Authentication](https://via.placeholder.com/800x400/2196F3/ffffff?text=Beautiful+Login+%26+Registration+Pages)

### 🚨 Price Alert Management
![Price Alerts](https://via.placeholder.com/800x400/FF9800/ffffff?text=Advanced+Price+Alert+System)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn package manager
- Firebase account (free)
- CoinGecko API (free, no key required)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/hawk198723/coinlist.git
   cd coinlist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase (Required for Authentication)**
   
   a. Visit [Firebase Console](https://console.firebase.google.com/)
   
   b. Create a new project named `coinlist-app`
   
   c. Enable Authentication (Email/Password)
   
   d. Create Firestore Database (Test mode)
   
   e. Add a Web app and get your config

4. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   touch .env
   ```
   
   Add your Firebase configuration:
   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   
   # Optional: CoinMarketCap API (for premium features)
   REACT_APP_CMC_API_KEY=your_coinmarketcap_api_key
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔥 Firebase Setup Guide

For detailed Firebase setup instructions, visit `/firebase-setup` in your running application for a step-by-step guide.

## 📁 Project Structure

```
coinlist/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js              # Navigation with auth & theme toggle
│   │   ├── WatchList.js           # Personal watchlist management
│   │   ├── Login.js               # User login page
│   │   ├── Register.js            # User registration page
│   │   ├── FirebaseSetup.js       # Firebase setup guide
│   │   ├── Pagination.js          # Advanced pagination controls
│   │   ├── CoinIcon.js            # Cryptocurrency icon display
│   │   ├── PriceAlertModal.js     # Price alert creation modal
│   │   └── AlertManager.js        # Price alert management
│   ├── contexts/
│   │   ├── ThemeContext.js        # Global theme state
│   │   ├── AuthContext.js         # User authentication state
│   │   └── PriceAlertContext.js   # Price alert management
│   ├── config/
│   │   └── firebase.js            # Firebase configuration
│   ├── services/
│   │   └── CMCAPI.js              # API integration (CoinGecko + CMC)
│   ├── CSS/
│   │   └── Styles.css             # Comprehensive styling system
│   ├── App.js                     # Main application component
│   ├── Root.js                    # Root with routing & providers
│   └── index.js                   # Application entry point
├── .env.example                   # Environment variables template
├── package.json
└── README.md
```

## 🎨 Theme System

### Light Theme Features
- Clean, professional white background
- Blue accent colors for interactive elements
- High contrast for optimal readability
- Subtle shadows and modern borders

### Dark Theme Features
- GitHub-inspired dark palette
- Reduced eye strain for low-light environments
- Green accent colors for better dark mode visibility
- Carefully chosen contrast ratios for accessibility

### Advanced Theme Features
- **System Detection** - Automatically detects user's system preference
- **Persistence** - Remembers user choice via localStorage
- **Smooth Transitions** - 0.3s animations for all theme changes
- **CSS Variables** - Maintainable and scalable color system
- **Component Consistency** - All components respect theme settings

## 🚨 Price Alert System

### Features
- **Real-time Monitoring** - Continuous price checking against your targets
- **Flexible Conditions** - Set alerts for prices above or below target values
- **Notification Options** - Choose one-time or repeated alerts
- **Alert Management** - Easy pause, resume, and delete functionality
- **Visual Indicators** - Clear display of active alerts and their status
- **Persistent Storage** - Alerts saved locally and survive browser restarts

### How to Use
1. Navigate to any cryptocurrency in the main list
2. Click the "Set Alert" button in the Alert column
3. Set your target price and conditions
4. Choose notification frequency (one-time or repeated)
5. Manage all alerts in the dedicated Alert Manager (`/alerts`)

## 🔧 Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run test suite
npm run build      # Build for production
npm run eject      # Eject from Create React App (⚠️ irreversible)
```

### Useful Commands
```bash
npm run lint       # Check code quality
npm run format     # Format code with Prettier
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔑 API Information

### CoinGecko API (Primary)
- **Free tier** - No API key required
- **Rate limits** - 10-50 calls/minute (generous for personal use)
- **Data quality** - High-quality, real-time cryptocurrency data
- **Features** - Price data, market cap, volume, price changes, coin icons

### CoinMarketCap API (Optional)
- **Free tier** - 10,000 calls/month, 30 calls/minute
- **Enhanced data** - Additional time periods (30d, 90d changes)
- **Setup** - Requires API key registration
- **Fallback** - Automatic fallback to CoinGecko if CMC fails

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Ideas
- 🌍 Internationalization (i18n)
- 📊 Advanced charting with Chart.js
- 📱 Progressive Web App (PWA) features
- 🔔 Browser push notifications
- 📈 Portfolio tracking
- 🔍 Advanced search and filtering

## 🐛 Known Issues

- Price alerts work with browser audio notifications (requires user interaction)
- CoinGecko API may occasionally be slower than CMC for real-time data
- Mobile keyboard may affect modal positioning on some devices

## 🚀 Future Roadmap

- [ ] Portfolio management and tracking
- [ ] Advanced price charts and technical analysis
- [ ] Browser push notifications for price alerts
- [ ] Social features (community watchlists)
- [ ] Mobile app versions (React Native)
- [ ] DeFi protocol integration
- [ ] News feed integration

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- **GitHub Repository**: [https://github.com/hawk198723/coinlist](https://github.com/hawk198723/coinlist)
- **Firebase Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
- **CoinGecko API**: [https://www.coingecko.com/en/api](https://www.coingecko.com/en/api)
- **React Documentation**: [https://reactjs.org/](https://reactjs.org/)

## 👨‍💻 Author

**Jason** - [hawk198723](https://github.com/hawk198723)

Feel free to reach out for questions, suggestions, or collaboration opportunities!

## 🙏 Acknowledgments

- **CoinGecko** for providing free, reliable cryptocurrency API
- **Firebase** for the excellent Backend-as-a-Service platform
- **FontAwesome** for the beautiful icon library
- **React community** for the amazing ecosystem and tools
- **Open source contributors** who inspire and support this project

## 📊 Project Stats

- **Lines of Code**: 2,700+
- **Components**: 15+
- **Features**: 20+
- **Supported Cryptocurrencies**: 10,000+
- **Development Time**: Continuously evolving

---

<div align="center">
  <p>🎯 Built with passion for the crypto community</p>
  <p>⭐ Star this repo if you find it helpful!</p>
  <p>🚀 Happy trading and tracking!</p>
  
  ![Crypto](https://img.shields.io/badge/Crypto-Friendly-FFD700?style=flat-square&logo=bitcoin)
  ![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red?style=flat-square)
  ![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
</div>