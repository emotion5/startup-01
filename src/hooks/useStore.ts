import { create } from 'zustand';

interface Startup {
    id: string;
    name: string;
    description: string;
    modelType: string;
}

interface AppState {
    selectedStartup: Startup | null;
    isModalOpen: boolean;
    modalContent: string | null;
    setSelectedStartup: (startup: Startup | null) => void;
    openModal: (content: string) => void;
    closeModal: () => void;
}

export const useStore = create<AppState>((set) => ({
    selectedStartup: null,
    isModalOpen: false,
    modalContent: null,
    setSelectedStartup: (startup) => set({ selectedStartup: startup }),
    openModal: (content) => set({ isModalOpen: true, modalContent: content }),
    closeModal: () => set({ isModalOpen: false, modalContent: null }),
}));
