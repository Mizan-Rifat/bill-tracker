import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddUser from './AddUser';
import { collection } from 'firebase/firestore';
import { db } from 'services/firebase';
import { useEffect } from 'react';
import { currencyFormat, getFsData } from 'services/helpers/utils';
import useUsersFetch from 'hooks/firebase/useUsersFetch';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirmation } from 'providers/ConfirmationProvider';
import useUserDelete from 'hooks/firebase/useUserDelete';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 30 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 200,
    editable: true,
  },
  {
    field: 'amount',
    headerName: 'amount',
    width: 100,
    editable: true,
    renderCell: (params) => `${params.row.amount} /-`,
  },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    width: 60,
    headerClassName: 'action',
    cellClassName: 'action',
  },
];

const usersRef = collection(db, 'users');

const Users = () => {
  const { isLoading, data } = useUsersFetch();

  return (
    <Box sx={{ width: '100%' }}>
      <AddUser />
      <DataGrid
        rows={data}
        loading={isLoading}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pamountSize: -1
        //     }
        //   }
        // }}
        // pamountSizeOptions={[5]}
        onCellEditStop={(params, event) => {
          console.log({ params, event });
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Users;
