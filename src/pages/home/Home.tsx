import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
    headerName: 'Amount',
    type: 'number',
    width: 110,
    editable: true,
    align: 'center',
  },
];

const rows = [
  {
    id: 1,
    name: 'Jon',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: 14,
  },
  {
    id: 2,
    name: 'Cersei',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: 31,
  },
  {
    id: 3,
    name: 'Jaime',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: 31,
  },
  {
    id: 4,
    name: 'Arya',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: 11,
  },
  {
    id: 5,
    name: 'Daenerys',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: null,
  },
  {
    id: 6,
    name: 'Hello',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: 150,
  },
  {
    id: 7,
    name: 'Ferrara',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: 44,
  },
  {
    id: 8,
    name: 'Rossini',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: 36,
  },
  {
    id: 9,
    name: 'Harvey',
    details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    amount: 65,
  },
];

const Home = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pamountSize: -1
        //     }
        //   }
        // }}
        // pamountSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Home;
