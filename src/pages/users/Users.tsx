import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import AddUser from './AddUser';
import ActionButtons from './ActionButtons';
import { useUsersStore } from 'services/stores/usersStore';
import { Button } from '@mui/material';
import { User } from 'types';

const columns: GridColDef<User>[] = [
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
    field: 'dish_amount',
    headerName: 'Dish amount',
    width: 90,
    renderCell: (params) => `${params.row.dish_amount} /-`,
  },
  {
    field: 'wifi_amount',
    headerName: 'Wifi amount',
    width: 90,
    renderCell: (params) => `${params.row.wifi_amount} /-`,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    flex: 1,
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
  const { rows, isLoading } = useUsersStore();

  return (
    <Box sx={{ width: '100%' }}>
      <AddUser />
      <Box>
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
          columnVisibilityModel={{
            id: false,
          }}
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
