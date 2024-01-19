import { GridRowModesModel } from '@mui/x-data-grid';
import { User } from 'types';
import { create } from 'zustand';

export interface Row extends User {
  isNew?: boolean;
}

interface UsersState {
  rows: Row[];
  rowModesModel: GridRowModesModel;
  isLoading?: boolean;

  setRows: (rows: Row[]) => void;
  setRowModesModel: (rowModesModel: GridRowModesModel) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  rows: [],
  rowModesModel: {},
  isLoading: false,

  setRows: (rows) => set({ rows }),
  setRowModesModel: (rowModesModel) => set({ rowModesModel }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
