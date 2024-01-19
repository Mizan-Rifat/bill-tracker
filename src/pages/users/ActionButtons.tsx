import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useUsersStore } from 'services/stores/usersStore';
import { useConfirmation } from 'providers/ConfirmationProvider';
import useUserDelete from 'hooks/firebase/useUserDelete';
import { useState } from 'react';
import UpdateUser from './UpdateUser';
import { User } from 'types';

const ActionButtons = ({ row }: { row: User }) => {
  const { setIsLoading } = useUsersStore();
  const confirm = useConfirmation();
  const { deleteUser } = useUserDelete(setIsLoading);

  const handleDeleteClick = async () => {
    await confirm().then(async () => {
      await deleteUser(row.uuid as string);
    });
  };

  return [
    <EditAction user={row} />,
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteClick}
      color="inherit"
    />,
  ];
};

const EditAction = ({ user }: { user: User }) => {
  const [data, setData] = useState<User | null>(null);
  return (
    <>
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={() => setData(user)}
        color="inherit"
      />
      <UpdateUser user={data} handleClose={() => setData(null)} />
    </>
  );
};

export default ActionButtons;
