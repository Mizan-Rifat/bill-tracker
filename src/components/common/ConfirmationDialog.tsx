import React from 'react';
import { Button, DialogContentText, Zoom } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  variant: 'error';
  description: string;
  onSubmit: () => void;
  onCancel: () => void;
  type: 'info' | 'action';
}

const ConfirmationDialog = ({
  open,
  title = 'Confirm',
  variant = 'error',
  description = 'Are you sure you want to delete this item?',
  onSubmit,
  onCancel,
  type = 'action',
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <DialogTitle sx={{ bgcolor: `${variant}.main`, color: 'common.white', py: 1 }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', alignItems: 'center', mt: 2.5 }}>
        <DialogContentText sx={{ ml: 0.5 }}>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {type === 'info' ? (
          <Button color={variant} size="small" variant="contained" onClick={onSubmit}>
            OK
          </Button>
        ) : (
          <>
            <Button color={variant} size="small" variant="outlined" onClick={onCancel}>
              CANCEL
            </Button>
            <Button color={variant} size="small" variant="contained" onClick={onSubmit}>
              Yes
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
