import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import React, { useRef } from 'react';

import {
  Document,
  removeDocument,
  updateDocumentWithPresignedUrl,
} from '../../../state/document/documentSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../state/store';
import ConfirmationModal, {
  ConfirmationModalRef,
} from '../../modals/confirmationModal/ConfirmationModal';

interface DocumentsTableProps {
  data: Document[];
  columns: any;
}

function DocumentsTable({ data, columns }: DocumentsTableProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openRowIndex, setOpenRowIndex] = React.useState<number | null>(null);
  const modalRef = useRef<ConfirmationModalRef>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    rowIndex: number
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenRowIndex(rowIndex);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenRowIndex(null);
  };
  const handleDocumentLaunch = async (document: Document) => {
    //note: setFocusedDocument(responsible for rendering the DocumentPreview component) is now abstracted into the function below
    dispatch(updateDocumentWithPresignedUrl(document));
  };
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.setOpen(true);
    }
  };

  // Create a mapping of document names to their occurrences
  const nameOccurrences: { [key: string]: number } = {};
  const updatedData = data.map((doc) => {
    const name = doc.name;
    if (nameOccurrences[name]) {
      nameOccurrences[name] += 1;
      return { ...doc, displayName: `${name} (${nameOccurrences[name]})` };
    } else {
      nameOccurrences[name] = 1;
      return { ...doc, displayName: name };
    }
  });

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        {columns}
        <TableBody>
          {updatedData.length === 0 ? (
            <TableRow>
              <TableCell align="center">No documents to display</TableCell>
            </TableRow>
          ) : (
            updatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell>{rowIndex + 1}</TableCell>

                <TableCell>{row.displayName}</TableCell>
                <TableCell>
                  {
                  <>
                    <ListItemButton
                      onClick={(event) => handleClick(event, rowIndex)}
                    >
                      <ListItemText primary={row.applications?.[0]} />
                      {row.applications.length > 1 &&
                      openRowIndex === rowIndex ? (
                        <ExpandLess />
                      ) : row.applications.length > 1 ? (
                        <ExpandMore />
                      ) : null}
                    </ListItemButton>

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={
                        openRowIndex === rowIndex &&
                        row.applications.length > 1
                      }
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {row.applications.map((application, index) => {
                          return (
                            <MenuItem key={index} onClick={handleClose}>
                              {application}
                            </MenuItem>
                          );
                        })}
                    </Menu>
                  </>
                }
                </TableCell>
                <TableCell>
                  {row.tags.length > 0 &&
                    row.tags[0]
                      .split(',')
                      .map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          sx={{ marginRight: '5px' }}
                        />
                      ))}
                </TableCell>
                <TableCell align="center" style={{ width: '30%' }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <Button
                      variant="text"
                      size="small"
                      startIcon={<LaunchIcon />}
                      onClick={() => handleDocumentLaunch(row)}
                      ></Button>
                    <Button
                      variant="text"
                      size="small"
                      color="secondary"
                      startIcon={<DeleteOutlineOutlinedIcon />}
                      onClick={openModal}
                      ></Button>
                  </Box>
                </TableCell>
                <ConfirmationModal
                  ref={modalRef}
                  title="Delete Document"
                  message={`Are you sure you want to delete the document: ${row.displayName}?`}
                  confirmAction={async () => dispatch(removeDocument(row._id))}
                />
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DocumentsTable;
