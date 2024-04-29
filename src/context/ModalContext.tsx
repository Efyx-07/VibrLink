import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  isSignoutModalOpen: boolean;
  openSignoutModal: () => void;
  closeSignoutModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  isSignoutModalOpen: false,
  openSignoutModal: () => {},
  closeSignoutModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);

  const openSignoutModal = () => setIsSignoutModalOpen(true);
  const closeSignoutModal = () => setIsSignoutModalOpen(false);

  const modalContextValue: ModalContextProps = {
    isSignoutModalOpen,
    openSignoutModal,
    closeSignoutModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};