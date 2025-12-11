import { create } from 'zustand';

interface DisclosureState {
    lastDisclosedAt: string | null;
    disclosedCommitIds: string[];

    disclose: (commitIds: string[]) => void;
    isDisclosed: (commitId: string) => boolean;
}

export const useDisclosureStore = create<DisclosureState>((set, get) => ({
    lastDisclosedAt: null,
    disclosedCommitIds: [],

    disclose: (commitIds) => {
        set((state) => ({
            lastDisclosedAt: new Date().toISOString(),
            disclosedCommitIds: [...new Set([...state.disclosedCommitIds, ...commitIds])]
        }));
    },

    isDisclosed: (commitId) => {
        return get().disclosedCommitIds.includes(commitId);
    }
}));
