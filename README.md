# 🪙 CoinList - Cryptocurrency Tracker

A modern, responsive cryptocurrency tracking application built with React that features real-time price data, watchlist functionality, and a beautiful dark/light theme toggle.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=flat-square&logo=css3)
![CoinMarketCap](https://img.shields.io/badge/API-CoinMarketCap-1E88E5?style=flat-square)

## ✨ Features

### 🌟 Core Functionality
- **Real-time Cryptocurrency Data** - Live price feeds from CoinMarketCap API
- **Interactive Watchlist** - Add/remove cryptocurrencies to your personal watchlist
- **Price Change Indicators** - Visual indicators for 1h, 24h, 30d, and 90d price changes
- **Market Data Display** - Comprehensive information including market cap, supply, and rankings

### 🎨 Modern UI/UX
- **Dual Theme System** - Seamless dark/light mode toggle with system preference detection
- **Professional Design** - GitHub-inspired dark theme and clean light theme
- **Smooth Animations** - Fluid transitions and hover effects throughout the interface
- **FontAwesome Icons** - Beautiful iconography for enhanced user experience

### 📱 Responsive Design
- **Mobile-First Approach** - Optimized for all device sizes
- **Adaptive Layout** - Intelligent layout adjustments for tablets and mobile devices
- **Touch-Friendly** - Optimized touch targets and gestures

### 🔧 Technical Features
- **React Context API** - Global theme state management
- **Local Storage** - Theme preferences persistence
- **CSS Variables** - Maintainable and scalable styling system
- **Modern JavaScript** - ES6+ features and best practices

## 🚀 Live Demo

Visit the live application: `http://localhost:3000` (when running locally)

## 📸 Screenshots

### Light Theme
![Light Theme](https://via.placeholder.com/800x400/ffffff/333333?text=Light+Theme+Screenshot)

### Dark Theme
![Dark Theme](https://via.placeholder.com/800x400/1a1a1a/e6edf3?text=Dark+Theme+Screenshot)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn package manager
- CoinMarketCap API key

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

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   echo "REACT_APP_CMC_API_KEY=your_api_key_here" > .env
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 API Configuration

This application uses the CoinMarketCap API for cryptocurrency data. To get started:

1. Visit [CoinMarketCap API](https://coinmarketcap.com/api/)
2. Sign up for a free account
3. Generate your API key
4. Add it to your `.env` file as `REACT_APP_CMC_API_KEY`

## 📁 Project Structure

```
coinlist/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js          # Navigation header with theme toggle
│   │   └── WatchList.js       # Watchlist display component
│   ├── contexts/
│   │   └── ThemeContext.js    # Global theme state management
│   ├── services/
│   │   └── CMCAPI.js          # CoinMarketCap API integration
│   ├── CSS/
│   │   └── Styles.css         # Global styles with CSS variables
│   ├── App.js                 # Main application component
│   ├── Root.js                # Root component with routing
│   └── index.js               # Application entry point
├── package.json
└── README.md
```

## 🎨 Theme System

The application features a sophisticated dual-theme system:

### Light Theme
- Clean, professional white background
- Blue accent colors (`#0252ff`)
- High contrast for optimal readability
- Subtle shadows and borders

### Dark Theme
- GitHub-inspired dark palette
- Reduced eye strain for low-light environments
- Green accent colors (`#238636`)
- Carefully chosen contrast ratios

### Theme Features
- **Auto-detection** - Respects system preferences
- **Persistence** - Remembers user choice via localStorage
- **Smooth transitions** - 0.3s animations for all theme changes
- **CSS Variables** - Maintainable color system

## 🔧 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/hawk198723/coinlist](https://github.com/hawk198723/coinlist)
- **CoinMarketCap API**: [https://coinmarketcap.com/api/](https://coinmarketcap.com/api/)
- **React Documentation**: [https://reactjs.org/](https://reactjs.org/)

## 👨‍💻 Author

**Jason** - [hawk198723](https://github.com/hawk198723)

## 🙏 Acknowledgments

- CoinMarketCap for providing the cryptocurrency API
- FontAwesome for the beautiful icons
- React community for the amazing ecosystem
- All contributors who help improve this project

---

<div align="center">
  <p>Made with ❤️ and React</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>