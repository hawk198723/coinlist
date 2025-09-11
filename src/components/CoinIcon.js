import React, { useState } from 'react';

const CoinIcon = ({ coinId, symbol, size = 24, className = "", imageUrl = null }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 优先使用传入的imageUrl（CoinGecko提供），否则使用CoinMarketCap格式
  const iconUrl = imageUrl || `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (imageError) {
    // Fallback to a generic coin icon using FontAwesome
    return (
      <div 
        className={`coin-icon-fallback ${className}`}
        style={{ 
          width: size, 
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--button-bg)',
          borderRadius: '50%',
          color: 'white',
          fontSize: `${size * 0.5}px`,
          fontWeight: 'bold'
        }}
        title={symbol}
      >
        {symbol ? symbol.charAt(0).toUpperCase() : '?'}
      </div>
    );
  }

  return (
    <div className={`coin-icon-container ${className}`} style={{ position: 'relative' }}>
      {isLoading && (
        <div 
          className="coin-icon-loading"
          style={{ 
            width: size, 
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--hover-bg)',
            borderRadius: '50%',
            color: 'var(--text-secondary)',
            fontSize: `${size * 0.4}px`
          }}
        >
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}
      <img
        src={iconUrl}
        alt={`${symbol} icon`}
        width={size}
        height={size}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ 
          borderRadius: '50%',
          display: isLoading ? 'none' : 'block'
        }}
        className="coin-icon"
      />
    </div>
  );
};

export default CoinIcon;
