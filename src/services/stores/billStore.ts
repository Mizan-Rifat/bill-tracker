import { Bill } from 'types';
import { create } from 'zustand';

interface BillState {
  bills: Bill[];
  initialBills: Bill[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setBills: (bills: Bill[]) => void;
  setInitialBills: (bills: Bill[]) => void;
}

export const useBillsStore = create<BillState>((set) => ({
  bills: [],
  initialBills: [],
  isLoading: false,

  setBills: (bills) => set({ bills }),
  setInitialBills: (initialBills) => set({ initialBills }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
