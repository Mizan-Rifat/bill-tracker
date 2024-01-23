import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useUsersStore } from 'services/stores/usersStore';
import { useConfirmation } from 'providers/ConfirmationProvider';
import useUserDelete from 'hooks/firebase/useUserDelete';
import { useState } from 'react';
import UpdateUser from './UpdateUser';
import { User } from 'types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBills from 'pages/bills/AddBills';

const ActionButtons = ({ row }: { row: User }) => {
  const { setIsLoading } = useUsersStore();
  const confirm = useConfirmation();
  const { deleteUser } = useUserDelete(setIsLoading);

  const handleDeleteClick = async () => {
    await confirm().then(async () => {
      await deleteUser(row.id as string);
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
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddBillModal, setOpenAddBillModal] = useState(false);
  return (
    <>
      <GridActionsCellItem
        icon={<AddCircleOutlineIcon />}
        label="Add Bills"
        className="textPrimary"
        onClick={() => setOpenAddBillModal(true)}
        color="inherit"
      />
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={() => setOpenUpdateModal(true)}
        color="inherit"
      />
      <UpdateUser
        user={user}
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
      />
      <AddBills
        user={user}
        open={openAddBillModal}
        handleClose={() => setOpenAddBillModal(false)}
      />
    </>
  );
};

export default ActionButtons;
