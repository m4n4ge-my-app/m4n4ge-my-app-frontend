//external imports
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useRef, useState } from 'react';
import MUIStyledTableRow from './utils/MUIStyledTableRow';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { getColors } from './utils/designUtilities';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import { visuallyHidden } from '@mui/utils';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

//local imports
import { setFocusedApplication } from '../../state/application/applicationSlice';
import { deleteApplication } from '../../services/applications';
import { show } from '../../state/feedback/feedbackSlice';
import { useAuthToken } from '../../hooks/useAuthToken';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../state/store';
import ConfirmationModal, {
  ConfirmationModalRef,
} from '../modals/confirmationModal/ConfirmationModal';
import {
  Application,
  searchApplications,
  workModes,
} from '../../utils/applications.util';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Application>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: boolean | string },
  b: { [key in Key]: boolean | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Application;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'isFavorite',
    numeric: false,
    disablePadding: true,
    label: 'Favorite',
  },
  {
    id: 'employerName',
    numeric: false,
    disablePadding: false,
    label: 'Employer Name',
  },
  {
    id: 'positionName',
    numeric: false,
    disablePadding: false,
    label: 'Role Name',
  },
  {
    id: 'jobLocation',
    numeric: false,
    disablePadding: false,
    label: 'Location',
  },
  {
    id: 'applicationDate',
    numeric: false,
    disablePadding: false,
    label: 'Job Application Date',
  },
  {
    id: 'jobPlatform',
    numeric: false,
    disablePadding: false,
    label: 'Platform',
  },
  {
    id: 'applicationStatus',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'workModel',
    numeric: false,
    disablePadding: false,
    label: 'Work Mode',
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Application
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Application) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: 'bold', color: 'GrayText' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { setKeyword } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        backgroundColor: '#f0f5ff',
      }}
    >
      <TextField
        sx={{ width: '36%', marginLeft: '10px' }}
        id="input-with-icon-textfield"
        label="Search"
        placeholder="Search by employer, role, etc."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={(e) => setKeyword(e.target.value)}
      />
    </Toolbar>
  );
}

interface ExpandedViewProps {
  gridWidth: number;
}

const ExpandedView = ({ gridWidth }: ExpandedViewProps) => {
  const _applications = useSelector(
    (state: RootState) => state.applications.applications
  );
  const focusedApplication = useSelector(
    (state: RootState) => state.applications.focusedApplication
  );
  const [applications, setApplications] = useState<Application[]>([]);
  const [orderBy, setOrderBy] = useState<keyof Application>('applicationDate');
  const [searchResult, setSearchResult] = useState<Application[] | null>(null);
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const modalRef = useRef<ConfirmationModalRef>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>('asc');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAuthToken();

  useEffect(() => {
    setSearchResult(searchApplications(applications, keyword));
    setApplications(_applications);
  }, [keyword, _applications]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Application
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (
    _event: React.MouseEvent<unknown>,
    id: number,
    application: Application
  ) => {
    const selectedIndex = selected.indexOf(id);
    setSelected([selectedIndex]);
    setClickedRowIndex(id === clickedRowIndex ? null : id);
    dispatch(setFocusedApplication(application));
  };

  const handleEditClick = (application: Application) => {
    dispatch(setFocusedApplication(application));
    navigate(`/app/edit/${application._id}`);
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.setOpen(true);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    setClickedRowIndex(null);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const totalRows =
    keyword.length > 0 ? searchResult!.length : applications.length;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalRows) : 0;

  const visibleRows = React.useMemo(() => {
    // Determine if the user is searching
    const isSearching = keyword.length > 0;

    // Start with either the search results or the full list of applications
    let rows: typeof searchResult | typeof applications = isSearching
      ? searchResult
      : applications;

    // If the user is searching but there are no search results, return an empty array
    if (isSearching && rows?.length === 0) {
      return [];
    }

    // Sort rows
    rows = stableSort(rows ?? [], getComparator(order, orderBy));

    // Apply pagination
    rows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    return rows;
  }, [keyword, searchResult, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ maxWidth: gridWidth }}>
      {applications.length !== 0 && (
        <Paper sx={{ width: '100%', mb: 2 }} className="applications-table">
          <EnhancedTableToolbar setKeyword={setKeyword} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <MUIStyledTableRow
                      className="applications-table-row"
                      hover
                      onClick={(event) => handleClick(event, index, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align="center" id={labelId}>
                        {row.isFavorite === true ? (
                          <FavoriteIcon
                            style={{ color: '#ff40da' }}
                            fontSize="small"
                          />
                        ) : (
                          <FavoriteBorderOutlinedIcon fontSize="small" />
                        )}
                      </TableCell>
                      <TableCell align="center" className="employerName">
                        {row.employerName}
                      </TableCell>
                      <TableCell align="center" className="roleName">
                        {row.positionName}
                      </TableCell>
                      <TableCell align="center" className="location">
                        {row.jobLocation}
                      </TableCell>
                      <TableCell align="center" className="applicationDate">
                        {row.applicationDate}
                      </TableCell>
                      <TableCell align="center">{row.jobPlatform}</TableCell>
                      {clickedRowIndex === index ? (
                        <>
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
                                startIcon={<ModeEditOutlineOutlinedIcon />}
                                onClick={() => handleEditClick(row)}
                              >
                                Edit
                              </Button>
                            </Box>
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
                                color="secondary"
                                startIcon={<DeleteOutlineOutlinedIcon />}
                                onClick={openModal}
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell align="center">
                            <Box
                              sx={{
                                marginLeft: 2,
                                ...getColors(row.applicationStatus),
                                borderRadius: '8px',
                                padding: '2px 5px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: getColors(row.applicationStatus).color,
                              }}
                            >
                              <Typography>{row.applicationStatus}</Typography>
                              {row.applicationStatus === 'Accepted' && (
                                <SportsScoreIcon />
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="center" style={{ width: '10%' }}>
                            {row.workModel.replace(/"/g, '') ===
                              workModes[0] && (
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                              >
                                <BusinessOutlinedIcon fontSize="small" />
                                {workModes[0]}
                              </Box>
                            )}
                            {row.workModel.replace(/"/g, '') ===
                              workModes[1] && (
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                              >
                                <MapsHomeWorkOutlinedIcon fontSize="small" />
                                {workModes[1]}
                              </Box>
                            )}
                            {row.workModel.replace(/"/g, '') ===
                              workModes[2] && (
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                              >
                                <CottageOutlinedIcon fontSize="small" />
                                {workModes[2]}
                              </Box>
                            )}
                          </TableCell>
                        </>
                      )}
                      <ConfirmationModal
                        ref={modalRef}
                        title="Delete Application"
                        message={`Are you sure you want to delete the application for ${focusedApplication?.positionName} at ${focusedApplication?.employerName}?`}
                        confirmAction={async () =>
                          await deleteApplication(token!, row._id!).then(
                            (response: AxiosResponse) => {
                              // fetchApplicationsData();
                              if (response.status === 204) {
                                dispatch(
                                  show({
                                    message: 'Application deleted successfully',
                                    severity: 'success',
                                  })
                                );
                              }
                              if (response instanceof AxiosError) {
                                dispatch(
                                  show({
                                    message: response?.response?.data.error,
                                    severity: 'error',
                                  })
                                );
                              }
                            }
                          )
                        }
                      />
                    </MUIStyledTableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              { label: 'All', value: applications.length },
            ]}
            component="div"
            count={(searchResult ?? applications).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ExpandedView;
