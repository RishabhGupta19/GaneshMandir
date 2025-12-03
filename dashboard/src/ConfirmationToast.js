import React from "react";

const ConfirmationToast = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-100 transform transition-all scale-100">
        
        {/* Icon & Message */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl mb-4">
            ❓
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Action</h3>
          <div className="text-gray-600 mb-6 font-medium">
            {message}
          </div>
        </div>
      
        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button 
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationToast;