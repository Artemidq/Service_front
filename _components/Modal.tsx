import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-[70px] absolute top-0 left-0">
      <div className="h-[calc(100vh-70px)] w-full fixed bg-[rgba(0,0,0,.4)]">
        <div className="flex h-full justify-center items-center modal-content">
          <div className="z-20">
            {children}
          </div>
          <div className="container z-10 h-full fixed">
            <button className="w-52 absolute top-[45px] right-0" onClick={onClose}>Закрыть окно</button>
          </div>
        </div>
      </div>
    </div>
  );
};
