import { GridRowModesModel } from '@mui/x-data-grid';
import { User } from 'types';
import { create } from 'zustand';

export interface Row extends User {
  isNew?: boolean;
}

interface UsersState {
  rows: Row[];
  rowModesModel: GridRowModesModel;
  isLoading: boolean;
  openAddModal: boolean;

  setRows: (rows: Row[]) => void;
  setRowModesModel: (rowModesModel: GridRowModesModel) => void;
  setIsLoading: (isLoading: boolean) => void;
  setOpenModal: (open: boolean) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  rows: [],
  rowModesModel: {},
  isLoading: false,
  openAddModal: false,

  setRows: (rows) => set({ rows }),
  setRowModesModel: (rowModesModel) => set({ rowModesModel }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setOpenModal: (open) => set({ openAddModal: open }),
}));
