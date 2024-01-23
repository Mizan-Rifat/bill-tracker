import { GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { useUsersStore } from 'services/stores/usersStore';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useBillsStore } from 'services/stores/billStore';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { FilterAltOff } from '@mui/icons-material';

const BillToolbar = (props) => {
  const { usersMap } = useUsersStore();
  const { bills, setBills, initialBills } = useBillsStore();
  const [user, setUser] = useState('');
  const [month, setMonth] = useState('');

  const userOptions = useMemo(
    () => [...new Set(initialBills.map((bill) => bill.user_id))],
    [bills],
  );
  const monthOptions = useMemo(
    () => [...new Set(initialBills.map((bill) => dayjs(bill.created_at).format('MMMM')))],
    [bills],
  );

  const filterByUser = ({ target: { value } }) => {
    setUser(value);
    const updatedBills = initialBills.filter((bill) => bill.user_id === value);
    setBills(updatedBills);
  };
  const filterByMonth = ({ target: { value } }) => {
    setMonth(value);
    const updatedBills = initialBills.filter(
      (bill) => dayjs(bill.created_at).format('MMMM') === value,
    );
    setBills(updatedBills);
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <Stack direction="row" sx={{ flex: 1 }}>
        <FormControl margin="dense" fullWidth size="small" sx={{ mr: 2 }}>
          <InputLabel id="user">User</InputLabel>
          <Select
            margin="dense"
            labelId="user"
            value={user}
            id="demo-simple-select"
            label="Item"
            size="small"
            onChange={filterByUser}
          >
            {userOptions.map((item) => (
              <MenuItem key={item} value={item}>
                {usersMap[item]?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth size="small" sx={{ mr: 2 }}>
          <InputLabel id="month">Month</InputLabel>
          <Select
            margin="dense"
            labelId="month"
            value={month}
            id="demo-simple-selects"
            label="Item"
            size="small"
            onChange={filterByMonth}
          >
            {monthOptions.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(user || month) && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => {
              setUser('');
              setMonth('');
              setBills(initialBills);
            }}
          >
            <FilterAltOff />
          </IconButton>
        )}
      </Stack>
      <GridToolbar {...props} />
    </GridToolbarContainer>
  );
};

export default BillToolbar;
