import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import AddUser from './AddUser';
import useUsersFetch from 'hooks/firebase/useUsersFetch';
import ActionButtons from './ActionButtons';
import { useUsersStore } from 'services/stores/usersStore';
import { Button } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 30 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 200,
  },
  {
    field: 'amount',
    headerName: 'amount',
    width: 100,
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

const CustomToolbar = (props) => {
  const { setOpenModal } = useUsersStore();
  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <Button variant="contained" disableElevation size="small" onClick={handleClick}>
        Add User
      </Button>
      <GridToolbar {...props} />
    </GridToolbarContainer>
  );
};

const Users = () => {
  const { rows, setIsLoading, isLoading } = useUsersStore();
  useUsersFetch(setIsLoading);

  return (
    <Box sx={{ width: '100%' }}>
      <AddUser />
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={rows}
          loading={isLoading}
          columns={columns}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableVirtualization
          disableColumnMenu
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Users;
