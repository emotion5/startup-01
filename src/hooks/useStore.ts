import { create } from 'zustand';
import type { Project, Company } from '../data/mockData';

interface AppState {
    selectedProject: Project | null;
    selectedCompany: Company | null;
    isModalOpen: boolean;
    modalContent: string | null;
    setSelectedProject: (project: Project | null) => void;
    setSelectedCompany: (company: Company | null) => void;
    openModal: (content?: string) => void; // content is optional now as we use selectedProject
    closeModal: () => void;
}

export const useStore = create<AppState>((set) => ({
    selectedProject: null,
    selectedCompany: null,
    isModalOpen: false,
    modalContent: null,
    setSelectedProject: (project) => set({ selectedProject: project }),
    setSelectedCompany: (company) => set({ selectedCompany: company }),
    openModal: (content) => set({ isModalOpen: true, modalContent: content || null }),
    closeModal: () => set({ isModalOpen: false, modalContent: null }),
}));

