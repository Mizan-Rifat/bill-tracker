import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowModes, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import { useUsersStore } from 'services/stores/usersStore';
import { useConfirmation } from 'providers/ConfirmationProvider';
import useUserDelete from 'hooks/firebase/useUserDelete';
import { useEffect } from 'react';

const ActionButtons = ({ id }: { id: GridRowId }) => {
  const { rows, setRows, rowModesModel, setRowModesModel, setIsLoading } = useUsersStore();
  const confirm = useConfirmation();
  const { deleteUser } = useUserDelete(setIsLoading);
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    await confirm().then(async () => {
      await deleteUser(id as string);
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  if (isInEditMode) {
    return [
      <GridActionsCellItem
        icon={<SaveIcon />}
        label="Save"
        sx={{
          color: 'primary.main',
        }}
        onClick={handleSaveClick(id)}
      />,
      <GridActionsCellItem
        icon={<CancelIcon />}
        label="Cancel"
        className="textPrimary"
        onClick={handleCancelClick(id)}
        color="inherit"
      />,
    ];
  }

  return [
    <GridActionsCellItem
      icon={<EditIcon />}
      label="Edit"
      className="textPrimary"
      onClick={handleEditClick(id)}
      color="inherit"
    />,
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={() => handleDeleteClick(id)}
      color="inherit"
    />,
  ];
};

export default ActionButtons;
