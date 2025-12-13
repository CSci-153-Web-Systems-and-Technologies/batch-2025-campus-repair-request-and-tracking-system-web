import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string | string[];
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  type,
  onClose,
  primaryButtonText = 'OK',
  onPrimaryClick,
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          headerColor: 'text-green-700',
          icon: '✓',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          buttonColor: 'bg-green-600 hover:bg-green-700',
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          headerColor: 'text-red-700',
          icon: '✕',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          buttonColor: 'bg-red-600 hover:bg-red-700',
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          headerColor: 'text-yellow-700',
          icon: '!',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
        };
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          headerColor: 'text-blue-700',
          icon: 'ℹ',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          buttonColor: 'bg-blue-600 hover:bg-blue-700',
        };
    }
  };

  const styles = getTypeStyles();
  const messageArray = Array.isArray(message) ? message : [message];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={`${styles.bgColor} border ${styles.borderColor} rounded-lg shadow-lg max-w-md w-full animate-in fade-in zoom-in-95 duration-200`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with icon */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`${styles.iconBg} rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                <span className={`${styles.iconColor} text-xl font-bold`}>
                  {styles.icon}
                </span>
              </div>
              <h2 className={`${styles.headerColor} text-lg font-semibold font-electrolize`}>
                {title}
              </h2>
            </div>

            {/* Message content */}
            <div className={`${styles.textColor} text-sm leading-relaxed mb-6 font-montserrat`}>
              {messageArray.length === 1 ? (
                <p>{messageArray[0]}</p>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {messageArray.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-montserrat rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {onPrimaryClick && (
                <button
                  onClick={onPrimaryClick}
                  className={`px-4 py-2 text-sm font-montserrat rounded-md text-white ${styles.buttonColor} transition-colors`}
                >
                  {primaryButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
