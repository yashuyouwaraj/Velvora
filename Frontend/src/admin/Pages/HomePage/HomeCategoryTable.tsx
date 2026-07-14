import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { HomeCategory } from '../../../types/HomeCategoryTypes';
import { useAppDispatch } from '../../../State/Store';
import { createHomeCategory, updateHomeCategory } from '../../../State/admin/AdminSlice';
import { fetchHomePageData } from '../../../State/customer/CustomerSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface HomeCategoryTableProps {
  section: string;
  title: string;
  data: HomeCategory[];
}

export default function HomeCategoryTable({ section, title, data }: HomeCategoryTableProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedCategory, setSelectedCategory] = useState<HomeCategory | null>(null);
  const [editedCategoryId, setEditedCategoryId] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedCategory(null);
      setEditedCategoryId('');
      setEditedName('');
      setEditedImage('');
      setFormError(null);
    }
  }, [open]);

  const handleOpenCreate = () => {
    setDialogMode('create');
    setOpen(true);
  };

  const handleOpenEdit = (category: HomeCategory) => {
    setSelectedCategory(category);
    setEditedCategoryId(category.categoryId);
    setEditedName(category.name || '');
    setEditedImage(category.image);
    setDialogMode('edit');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!editedCategoryId.trim() || !editedImage.trim()) {
      setFormError('Category ID and image URL are required.');
      return;
    }

    const payload: HomeCategory = {
      categoryId: editedCategoryId.trim(),
      name: editedName.trim(),
      image: editedImage.trim(),
      section,
    };

    if (dialogMode === 'edit' && selectedCategory?.id) {
      await dispatch(updateHomeCategory({ id: selectedCategory.id, data: { ...payload, id: selectedCategory.id } }));
    } else {
      await dispatch(createHomeCategory(payload));
    }

    await dispatch(fetchHomePageData());
    handleClose();
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Typography variant="h6">{title}</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          Add New Item
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  No records found.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              data.map((category, index) => (
                <StyledTableRow key={category.id ?? `${category.categoryId}-${index}`}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{category.id ?? '—'}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      className="w-20 rounded-md"
                      src={category.image}
                      alt={category.name || category.categoryId}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">{category.categoryId}</StyledTableCell>
                  <StyledTableCell align="right">{category.name || '—'}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handleOpenEdit(category)}>
                      <Edit />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{dialogMode === 'create' ? 'Add Home Category' : 'Edit Home Category'}</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            fullWidth
            label="Category Id"
            value={editedCategoryId}
            onChange={(event) => setEditedCategoryId(event.target.value)}
          />
          <TextField
            fullWidth
            label="Name"
            value={editedName}
            onChange={(event) => setEditedName(event.target.value)}
          />
          <TextField
            fullWidth
            label="Image URL"
            value={editedImage}
            onChange={(event) => setEditedImage(event.target.value)}
          />
          {formError && (
            <Typography color="error">{formError}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
