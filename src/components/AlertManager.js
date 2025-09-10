import React from 'react';
import { usePriceAlert } from '../contexts/PriceAlertContext';

const AlertManager = () => {
  const { alerts, removeAlert, toggleAlert, triggeredAlerts } = usePriceAlert();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
  };

  if (alerts.length === 0) {
    return (
      <div className="App">
        <h1>
          <i className="fas fa-bell" style={{ marginRight: "10px" }}></i>
          Price Alerts
        </h1>
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <i className="fas fa-bell-slash" style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.5 }}></i>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>No price alerts set</p>
          <p>Go to the main page to set up your first price alert!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>
        <i className="fas fa-bell" style={{ marginRight: "10px" }}></i>
        Price Alerts ({alerts.length})
      </h1>
      
      <div className="alerts-container">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-card ${!alert.isActive ? 'inactive' : ''}`}>
            <div className="alert-header">
              <div className="alert-coin-info">
                <strong>{alert.coinName} ({alert.coinSymbol})</strong>
                <span className={`alert-status ${alert.isActive ? 'active' : 'inactive'}`}>
                  {alert.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="alert-actions">
                <button
                  className={`btn btn-toggle ${alert.isActive ? 'btn-pause' : 'btn-play'}`}
                  onClick={() => toggleAlert(alert.id)}
                  title={alert.isActive ? 'Pause Alert' : 'Resume Alert'}
                >
                  <i className={`fas ${alert.isActive ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => removeAlert(alert.id)}
                  title="Delete Alert"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            
            <div className="alert-details">
              <div className="alert-condition">
                <span className="condition-text">
                  Alert when price goes <strong>{alert.condition}</strong>{' '}
                  <span className="target-price">${alert.targetPrice.toFixed(2)}</span>
                </span>
              </div>
              
              <div className="alert-meta">
                <div className="alert-type">
                  <i className={`fas ${alert.alertType === 'once' ? 'fa-clock' : 'fa-redo'}`}></i>
                  {alert.alertType === 'once' ? 'One-time alert' : 'Recurring alert'}
                </div>
                
                {alert.alertType === 'once' && triggeredAlerts.includes(alert.id) && (
                  <div className="alert-triggered">
                    <i className="fas fa-check-circle"></i>
                    Already triggered
                  </div>
                )}
                
                <div className="alert-created">
                  Created: {formatDate(alert.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertManager;
