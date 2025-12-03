import React, { useState, useEffect } from 'react';

// Toast Component
export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠';

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        <div className="toast-icon">{icon}</div>
        <p className="toast-message">{message}</p>
        <button 
          onClick={onClose}
          className="toast-close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Toast Container Hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="toast-wrapper">
      {toasts.map((toast, index) => (
        <div key={toast.id} style={{ marginBottom: index > 0 ? '12px' : '0' }}>
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );

  return { showToast, ToastContainer };
};