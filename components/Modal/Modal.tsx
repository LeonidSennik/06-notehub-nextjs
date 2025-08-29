'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; 

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = ''; 
    };
  }, [onClose]);

  const handleBackdropClick = () => onClose();
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={handleContentClick}>
        {children}
      </div>
    </div>,
    document.body
  );
}
