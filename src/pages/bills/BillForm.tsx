import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useUsersStore } from 'services/stores/usersStore';
import { Bill } from 'types';
import useAddBill from 'hooks/firebase/useAddBill';

const BillForm = ({
  formId,
  onComplete,
  type,
}: {
  formId: string;
  onComplete: () => void;
  type: 'dish' | 'wifi';
}) => {
  const { setIsLoading } = useUsersStore();

  const { addBill } = useAddBill(setIsLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<Bill>();

  const onSubmit = async (data: Bill) => {
    try {
      await addBill(data, type);
      reset();
      onComplete();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id={formId}>
        <Stack spacing={2}>
          <TextField
            margin="dense"
            fullWidth
            id="date"
            label="Date"
            type="date"
            error={!!errors.date}
            helperText={<>{errors.date?.message}</>}
            // value={date}
            // onChange={(e) => setDate(e.target.value)}
            {...register('date', { required: 'This field is required' })}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Paid"
            error={!!errors.paid}
            type="number"
            helperText={<>{errors.paid?.message}</>}
            {...register('paid', { required: 'This field is required' })}
          />
          <TextField
            label="Due"
            error={!!errors.due}
            defaultValue={0}
            type="number"
            helperText={<>{errors.due?.message}</>}
            {...register('due', { required: 'This field is required' })}
          />
        </Stack>
      </form>
    </>
  );
};

export default BillForm;
