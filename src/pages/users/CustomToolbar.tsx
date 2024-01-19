import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useUsersStore } from 'services/stores/usersStore';

const CustomToolbar = () => {
  const { rows, setRows, rowModesModel, setRowModesModel } = useUsersStore();

  const handleClick = () => {
    const id = randomId();
    setRows([...rows, { id, name: '', details: '', amount: 0, isNew: true }]);

    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
