import Box from '@mui/material/Box';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { useBillsStore } from 'services/stores/billStore';
import useBillsFetch from 'hooks/firebase/useBillsFetch';
import { Bill } from 'types';
import dayjs from 'dayjs';
import BillToolbar from './BillToolbar';
import { useMemo, useState } from 'react';
import { useConfirmation } from 'providers/ConfirmationProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import useUpdateBill from 'hooks/firebase/useUpdateBill';
import useBillDelete from 'hooks/firebase/useDeleteBill';
import { Stack, Typography } from '@mui/material';
import { numberFormat } from 'services/helpers/utils';

const Bills = ({ type }: { type: 'dish' | 'wifi' }) => {
  const { bills, setIsLoading, isLoading } = useBillsStore();
  useBillsFetch(setIsLoading, type);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const confirm = useConfirmation();
  const { updateBill } = useUpdateBill(setIsLoading);
  const { deleteBill } = useBillDelete(setIsLoading);
  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id) => {
    await confirm().then(async () => {
      await deleteBill(id as string, type);
    });
  };

  const processRowUpdate = async (newRow: GridRowModel<Bill>) => {
    const updatedRow = { ...newRow, isNew: false };
    await updateBill(
      newRow.id,
      {
        paid: Number(newRow.paid),
        due: Number(newRow.due),
        created_at: dayjs(newRow.created_at).format(),
      },
      type,
    );
    return updatedRow;
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 30,
      },
      {
        field: 'user_id',
        headerName: 'ID',
        width: 30,
      },

      {
        field: 'user_name',
        headerName: 'Name',
        width: 150,
        renderCell: (params) => {
          return params.row.user?.name;
        },
      },

      {
        field: 'paid',
        headerName: 'Paid',
        width: 80,
        renderCell: (params) => `${params.row.paid} /-`,
        editable: true,
      },
      {
        field: 'due',
        headerName: 'Due',
        width: 80,
        renderCell: (params) => `${params.row.due} /-`,
        editable: true,
      },
      {
        field: 'created_at',
        headerName: 'Date',
        type: 'date',
        width: 100,
        valueGetter: ({ row }) => new Date(row.created_at),
        renderCell: (params) => <>{dayjs(params.row.created_at).format('DD MMM, YYYY')}</>,
        editable: true,
      },

      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        flex: 1,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={() => handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={() => handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ],
    [rowModesModel],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <DataGrid
          rows={bills}
          loading={isLoading}
          columns={columns}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableVirtualization
          editMode="row"
          disableColumnMenu
          slots={{
            toolbar: BillToolbar,
            pagination: () => (
              <Stack
                direction="row"
                sx={{ width: 1 }}
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Box>
                  <Typography fontSize={14}>
                    Total Paid: {numberFormat(bills.reduce((acc, bill) => bill.paid + acc, 0))} /-
                  </Typography>
                  <Typography fontSize={14}>
                    Total Due: {numberFormat(bills.reduce((acc, bill) => bill.due + acc, 0))} /-
                  </Typography>
                </Box>
                <Typography fontSize={14}>Showing {bills.length} items</Typography>
              </Stack>
            ),
          }}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          // paginationModel={{
          //   pageSize: 100,
          //   page: 1,
          // }}

          columnVisibilityModel={{
            id: false,
            user_id: false,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: false,
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
            },
            // pagination: {
            //   rowsPerPageOptions: [],
            //   labelDisplayedRows: ({ from, to, count }) => {
            //     return <Typography variant="caption">Showing {count} items</Typography>;
            //   },
            // },
          }}
          sx={{
            '& .MuiDataGrid-footerContainer': {
              justifyContent: 'flex-start',
              padding: 2,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Bills;
