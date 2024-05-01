import { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isSignOutModalOpen: boolean;
  openSignOutModal: () => void;
  closeSignOutModal: () => void;
  isDeleteAccountModalOpen: boolean;
  openDeleteAccountModal: () => void;
  closeDeleteAccountModal: () => void;
  isRemoveReleaseModalOpen: boolean;
  openRemoveReleaseModal: (releaseId: number) => void;
  closeRemoveReleaseModal: () => void;
  modalReleaseId: number | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const openSignOutModal = () => {
    setIsSignOutModalOpen(true);
  };

  const closeSignOutModal = () => {
    setIsSignOutModalOpen(false);
  };

  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  const openDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const closeDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  const [isRemoveReleaseModalOpen, setIsRemoveReleaseModalOpen] = useState(false);
  const [modalReleaseId, setModalReleaseId] = useState<number | null>(null);

  const openRemoveReleaseModal = (releaseId: number) => {
    setModalReleaseId(releaseId);
    setIsRemoveReleaseModalOpen(true);
  };

  const closeRemoveReleaseModal = () => {
    setModalReleaseId(null);
    setIsRemoveReleaseModalOpen(false);
  };

  const value: ModalContextType = {
    isSignOutModalOpen,
    openSignOutModal,
    closeSignOutModal,
    isDeleteAccountModalOpen,
    openDeleteAccountModal,
    closeDeleteAccountModal,
    isRemoveReleaseModalOpen,
    openRemoveReleaseModal: (releaseId: number) => openRemoveReleaseModal(releaseId),
    closeRemoveReleaseModal,
    modalReleaseId
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};