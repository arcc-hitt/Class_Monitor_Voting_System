import React, { useEffect } from 'react';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose && onClose();
    };
    document.addEventListener('keydown', handleKey);
    // prevent background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onMouseDown={e => {
        // if backdrop clicked, close
        if (e.target === e.currentTarget) onClose && onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">{children}</div>
    </div>
  );
};

export default Modal;
