// CoinMarketCap API配置
const API_KEY = process.env.REACT_APP_CMC_API_KEY;
const CMC_API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

// 备用：CoinGecko API（无需密钥）
// 使用 CORS 代理来避免跨域问题
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";
// const COINGECKO_API_URL_WITH_PROXY = CORS_PROXY + encodeURIComponent(COINGECKO_API_URL);

const getCoinData = async (start = 1, limit = 100, retryCount = 0) => {
  const maxRetries = 2;
  
  try {
    // 如果有CMC API密钥，优先使用CMC
    if (API_KEY && API_KEY !== 'your_coinmarketcap_api_key_here') {
      return await getCMCData(start, limit);
    } else {
      console.log('Using CoinGecko API (no CMC key provided)');
      return await getCoinGeckoData(start, limit);
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.log(`🔄 Retrying API call (attempt ${retryCount + 1}/${maxRetries + 1})`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒
      return getCoinData(start, limit, retryCount + 1);
    } else {
      console.error('🚨 All API retry attempts failed');
      throw error;
    }
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
  // CoinGecko API 分页从1开始，正确计算页码
  const page = Math.floor((start - 1) / limit) + 1;
  console.log(`📊 CoinGecko API: Fetching page ${page} (start: ${start}, limit: ${limit})`);
  
  // 构建完整的 CoinGecko URL
  const coinGeckoParams = `?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`;
  const fullCoinGeckoUrl = COINGECKO_API_URL + coinGeckoParams;
  
  // 尝试使用 CORS 代理
  try {
    const proxyUrl = CORS_PROXY + encodeURIComponent(fullCoinGeckoUrl);
    console.log(`🔗 Trying CORS proxy first...`);
    
    const response = await fetch(proxyUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    
    if (!response.ok) {
      throw new Error(`Proxy API error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ CORS proxy success!`);
    
    return transformCoinGeckoData(data, page, limit);
    
  } catch (proxyError) {
    console.warn(`🚨 CORS proxy failed, trying direct API call:`, proxyError.message);
    
    // 备用：尝试直接调用 CoinGecko API（可能被 CORS 阻止）
    try {
      const response = await fetch(fullCoinGeckoUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`✅ Direct CoinGecko API success!`);
      
      return transformCoinGeckoData(data, page, limit);
      
    } catch (directError) {
      console.error("Both proxy and direct API calls failed:", directError);
      throw new Error(`API calls failed - Proxy: ${proxyError.message}, Direct: ${directError.message}`);
    }
  }
};

// 数据转换函数
const transformCoinGeckoData = (data, page, limit) => {
  // 检查是否到达数据末尾（返回的数据少于请求的数量）
  const isLastPage = data.length < limit;
  const actualTotalEstimate = isLastPage 
    ? (page - 1) * limit + data.length 
    : Math.max(15000, page * limit); // 如果不是最后一页，使用保守估计
  
  // 转换CoinGecko数据格式为CMC格式
  const transformedData = {
    data: data.map((coin, index) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      slug: coin.id,
      cmc_rank: coin.market_cap_rank || ((page - 1) * limit + index + 1),
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
      total_count: actualTotalEstimate,
      is_last_page: isLastPage
    }
  };
  
  console.log(`✅ CoinGecko data processed: ${data.length} coins for page ${page}`);
  if (isLastPage) {
    console.log(`📊 Reached end of data. Total available cryptocurrencies: ${actualTotalEstimate}`);
  }
  console.log('⚠️ Using CoinGecko API (fallback)');
  return transformedData;
};

const CMCAPI = { getCoinData };
export default CMCAPI;
