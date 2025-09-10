import React, { useState } from 'react';
import { usePriceAlert } from '../contexts/PriceAlertContext';

const PriceAlertModal = ({ isOpen, onClose, coin }) => {
  const { addAlert } = usePriceAlert();
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState('above'); // 'above' or 'below'
  const [alertType, setAlertType] = useState('once'); // 'once' or 'recurring'

  if (!isOpen || !coin) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!targetPrice || parseFloat(targetPrice) <= 0) {
      alert('Please enter a valid target price');
      return;
    }

    addAlert(
      coin.id,
      coin.name,
      coin.symbol,
      targetPrice,
      alertType,
      condition
    );

    // 重置表单并关闭弹窗
    setTargetPrice('');
    setCondition('above');
    setAlertType('once');
    onClose();
  };

  const currentPrice = coin.quote?.USD?.price || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <i className="fas fa-bell" style={{ marginRight: '8px' }}></i>
            Set Price Alert
          </h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="coin-info-display">
            <div className="coin-current-info">
              <strong>{coin.name} ({coin.symbol})</strong>
              <div className="current-price">
                Current Price: <span className="price-highlight">${currentPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="condition">Alert Condition:</label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="form-select"
              >
                <option value="above">When price goes above</option>
                <option value="below">When price goes below</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="targetPrice">Target Price ($):</label>
              <input
                type="number"
                id="targetPrice"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="Enter target price"
                step="0.01"
                min="0.01"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="alertType">Alert Frequency:</label>
              <select
                id="alertType"
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                className="form-select"
              >
                <option value="once">Alert me once</option>
                <option value="recurring">Alert me every time</option>
              </select>
              <small className="form-help">
                {alertType === 'once' 
                  ? 'You will be notified only the first time the target is reached'
                  : 'You will be notified every time the price crosses the target'
                }
              </small>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-bell" style={{ marginRight: '5px' }}></i>
                Set Alert
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PriceAlertModal;
