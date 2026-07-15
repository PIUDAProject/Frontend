import { create } from 'zustand';

interface MedicationSheetStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useMedicationSheetStore = create<MedicationSheetStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
