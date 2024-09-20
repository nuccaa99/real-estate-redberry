import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isAgentModalOpen,
        setIsAgentModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
