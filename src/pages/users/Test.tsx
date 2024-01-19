import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridPreProcessEditCellProps, GridRowModel } from '@mui/x-data-grid';
import useUsersFetch from 'hooks/firebase/useUsersFetch';
import { useEffect } from 'react';
import { Row, useUsersStore } from 'services/stores/usersStore';
import ActionButtons from './ActionButtons';
import CustomToolbar from './CustomToolbar';
import { User } from 'types';
import useAddUser from 'hooks/firebase/useAddUser';

const requiredRule = (params: GridPreProcessEditCellProps<User>) => ({
  ...params.props,
  error: !params.props.value,
});

const columns: GridColDef<User>[] = [
  { field: 'id', headerName: 'ID', width: 30 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
    preProcessEditCellProps: requiredRule,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 200,
    editable: true,
    preProcessEditCellProps: requiredRule,
  },
  {
    field: 'amount',
    headerName: 'amount',
    width: 100,
    type: 'number',
    editable: true,
    preProcessEditCellProps: requiredRule,
    renderCell: (params) => `${params.row.amount} /-`,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ActionButtons,
  },
];

export default function FullFeaturedCrudGrid() {
  const { rows, setRows, rowModesModel, setRowModesModel, isLoading, setIsLoading } =
    useUsersStore();
  const { isLoading: userFetchLoading, data: users } = useUsersFetch();

  const { addUser } = useAddUser(setIsLoading);

  const processRowUpdate = async (newRow: GridRowModel<Row>) => {
    console.log({ newRow });

    // if (newRow.isNew) {
    //   await addUser(newRow);
    //   return null;
    //   return null;
    // }

    const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  useEffect(() => {
    setRows(users);
  }, [users]);

  return (
    <Box
      sx={(theme) => ({
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        '& .MuiDataGrid-cell--editing': {
          '& .MuiInputBase-root': {
            height: '100%',
          },
        },
        '& .Mui-error': {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
        },
      })}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        loading={isLoading || userFetchLoading}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}
