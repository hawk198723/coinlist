import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const PriceAlertContext = createContext();

export const usePriceAlert = () => {
  const context = useContext(PriceAlertContext);
  if (!context) {
    throw new Error('usePriceAlert must be used within a PriceAlertProvider');
  }
  return context;
};

export const PriceAlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState(() => {
    // 从localStorage加载已保存的报警
    const savedAlerts = localStorage.getItem('priceAlerts');
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });

  const [triggeredAlerts, setTriggeredAlerts] = useState(() => {
    // 加载已触发的一次性报警记录
    const triggered = localStorage.getItem('triggeredAlerts');
    return triggered ? JSON.parse(triggered) : [];
  });

  // 保存报警到localStorage
  useEffect(() => {
    localStorage.setItem('priceAlerts', JSON.stringify(alerts));
  }, [alerts]);

  // 保存已触发的报警记录
  useEffect(() => {
    localStorage.setItem('triggeredAlerts', JSON.stringify(triggeredAlerts));
  }, [triggeredAlerts]);

  // 添加新的价格报警
  const addAlert = (coinId, coinName, coinSymbol, targetPrice, alertType, condition) => {
    const newAlert = {
      id: Date.now() + Math.random(), // 简单的ID生成
      coinId,
      coinName,
      coinSymbol,
      targetPrice: parseFloat(targetPrice),
      alertType, // 'once' 或 'recurring'
      condition, // 'above' 或 'below'
      createdAt: new Date().toISOString(),
      isActive: true
    };

    setAlerts(prev => [...prev, newAlert]);
    toast.success(`Price alert set for ${coinSymbol} at $${targetPrice}`);
    return newAlert.id;
  };

  // 删除报警
  const removeAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    // 同时清理已触发记录
    setTriggeredAlerts(prev => prev.filter(id => id !== alertId));
    toast.info('Price alert removed');
  };

  // 切换报警状态
  const toggleAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
  };

  // 检查价格并触发报警
  const checkPriceAlerts = (coinData) => {
    if (!coinData || coinData.length === 0) return;

    alerts.forEach(alert => {
      if (!alert.isActive) return;

      // 如果是一次性报警且已经触发过，跳过
      if (alert.alertType === 'once' && triggeredAlerts.includes(alert.id)) {
        return;
      }

      // 找到对应的币种数据
      const coin = coinData.find(c => c.id === alert.coinId);
      if (!coin) return;

      const currentPrice = coin.quote.USD.price;
      const targetPrice = alert.targetPrice;
      let shouldTrigger = false;

      if (alert.condition === 'above' && currentPrice >= targetPrice) {
        shouldTrigger = true;
      } else if (alert.condition === 'below' && currentPrice <= targetPrice) {
        shouldTrigger = true;
      }

      if (shouldTrigger) {
        // 触发报警通知
        const message = `🚨 ${alert.coinSymbol} price alert! Current: $${currentPrice.toFixed(2)} (Target: ${alert.condition} $${targetPrice})`;
        
        toast.warning(message, {
          position: "top-center",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // 如果是一次性报警，记录已触发
        if (alert.alertType === 'once') {
          setTriggeredAlerts(prev => [...prev, alert.id]);
        }

        // 播放提示音（如果浏览器支持）
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Tw/HShzQGJHLN+tuMOgcXa7rts5xKDBU=');
          audio.volume = 0.3;
          audio.play().catch(() => {}); // 忽略播放失败
        } catch (e) {
          // 忽略音频播放错误
        }
      }
    });
  };

  // 获取指定币种的活跃报警
  const getAlertsForCoin = (coinId) => {
    return alerts.filter(alert => alert.coinId === coinId && alert.isActive);
  };

  // 获取所有活跃报警
  const getActiveAlerts = () => {
    return alerts.filter(alert => alert.isActive);
  };

  const value = {
    alerts,
    addAlert,
    removeAlert,
    toggleAlert,
    checkPriceAlerts,
    getAlertsForCoin,
    getActiveAlerts,
    triggeredAlerts
  };

  return (
    <PriceAlertContext.Provider value={value}>
      {children}
    </PriceAlertContext.Provider>
  );
};
