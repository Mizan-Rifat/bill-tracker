import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import useAddUser from 'hooks/firebase/useAddUser';
import { useUsersStore } from 'services/stores/usersStore';
import useUpdateUser from 'hooks/firebase/useUpdateUser';
import { User } from 'types';

const UserForm = ({ formId, onComplete }: { formId: string; onComplete: () => void }) => {
  const { setIsLoading } = useUsersStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<User>();

  const { addUser } = useAddUser(setIsLoading);
  const { updateUser } = useUpdateUser(setIsLoading);

  const onSubmit = async (data: User) => {
    try {
      if (formId === 'add_user') {
        await addUser(data);
      } else {
        const { id, dish_amount, wifi_amount, ...rest } = data;
        await updateUser(id, {
          ...rest,
          dish_amount: Number(dish_amount),
          wifi_amount: Number(wifi_amount),
        } as User);
      }
      reset();

      onComplete();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id={formId}>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Name"
            error={!!errors.name}
            helperText={<>{errors.name?.message}</>}
            {...register('name', { required: 'This field is required' })}
          />
          <TextField
            label="Details"
            multiline
            rows={3}
            error={!!errors.details}
            helperText={<>{errors.details?.message}</>}
            {...register('details', { required: 'This field is required' })}
          />
          <TextField
            label="Dish Amount"
            error={!!errors.dish_amount}
            type="number"
            defaultValue={0}
            helperText={<>{errors.dish_amount?.message}</>}
            {...register('dish_amount')}
          />
          <TextField
            label="Wifi Amount"
            error={!!errors.wifi_amount}
            type="number"
            defaultValue={0}
            helperText={<>{errors.wifi_amount?.message}</>}
            {...register('wifi_amount')}
          />
        </Stack>
      </form>
    </>
  );
};

export default UserForm;
