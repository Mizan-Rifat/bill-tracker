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
  usersMap: { [key: string]: User };

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
  usersMap: {},
  setRows: (rows) => {
    const usersMap = rows.reduce((acc, row) => {
      acc[row.id] = row;
      return acc;
    }, {});

    return set({ rows, usersMap });
  },
  setRowModesModel: (rowModesModel) => set({ rowModesModel }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setOpenModal: (open) => set({ openAddModal: open }),
}));
