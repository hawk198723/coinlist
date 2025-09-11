// CoinMarketCap API配置
const API_KEY = process.env.REACT_APP_CMC_API_KEY;
const CMC_API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

// 备用：CoinGecko API（无需密钥）
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/coins/markets";

const getCoinData = async (start = 1, limit = 100) => {
  // 如果有CMC API密钥，优先使用CMC
  if (API_KEY && API_KEY !== 'your_coinmarketcap_api_key_here') {
    return getCMCData(start, limit);
  } else {
    console.log('Using CoinGecko API (no CMC key provided)');
    return getCoinGeckoData(start, limit);
  }
};

// CoinMarketCap API调用
const getCMCData = async (start, limit) => {
  try {
    const url = `${CMC_API_URL}?start=${start}&limit=${limit}&convert=USD`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    });
    
    if (!response.ok) {
      throw new Error(`CMC API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Using CoinMarketCap API');
    return data;
  } catch (error) {
    console.error("CMC API failed, falling back to CoinGecko:", error);
    return getCoinGeckoData(start, limit);
  }
};

// CoinGecko API调用（备用）
const getCoinGeckoData = async (start, limit) => {
  try {
    const page = Math.ceil(start / limit);
    const url = `${COINGECKO_API_URL}?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 转换CoinGecko数据格式为CMC格式
    const transformedData = {
      data: data.map((coin, index) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        slug: coin.id,
        cmc_rank: coin.market_cap_rank || (start + index),
        circulating_supply: coin.circulating_supply,
        total_supply: coin.total_supply,
        max_supply: coin.max_supply,
        image: coin.image, // CoinGecko图标URL
        quote: {
          USD: {
            price: coin.current_price,
            market_cap: coin.market_cap,
            percent_change_1h: coin.price_change_percentage_1h_in_currency || 0,
            percent_change_24h: coin.price_change_percentage_24h || 0,
            percent_change_7d: coin.price_change_percentage_7d_in_currency || 0,
          }
        }
      })),
      status: {
        total_count: 10000
      }
    };
    
    console.log('⚠️ Using CoinGecko API (fallback)');
    return transformedData;
  } catch (error) {
    console.error("Both APIs failed:", error);
    throw error;
  }
};

const CMCAPI = { getCoinData };
export default CMCAPI;
