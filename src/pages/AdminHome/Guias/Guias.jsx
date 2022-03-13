import "./Guias.css"
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { FiRefreshCcw } from "react-icons/fi"
import { guias } from "../../../db-conn/guides/getAllGuias";
import { AddHorasButton, EditarStatusButton, TrashIcon } from "../../../components/Buttons";
import { updateHours } from "../../../db-conn/guides/updateHours";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ModalAlert from "../../../components/ModalAlert"
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import { deleteGuides } from "../../../db-conn/guides/deleteGuides";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

const headCells = [
  {
    id: 'prestador',
    numeric: false,
    disablePadding: true,
    label: 'Prestador',
  },
  {
    id: 'idGuia',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'fechaNacimiento',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de nacimiento',
  },
  {
    id: 'turno',
    numeric: false,
    disablePadding: false,
    label: 'Turno',
  },
  {
    id: 'servicio',
    numeric: false,
    disablePadding: false,
    label: 'Servicio',
  },
  {
    id: 'horasRealizadas',
    numeric: true,
    disablePadding: false,
    label: 'Horas realizadas',
  },
  {
    id: 'genero',
    numeric: false,
    disablePadding: false,
    label: 'Género',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'seleccionar todos los guías',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected === 1 ? `${numSelected} seleccionado` : `${numSelected} seleccionados`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Guías
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Guias = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasValues, setHasValues] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [hours, setHours] = useState("");
  const [dialog, setDialog] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      setRows(await guias())
      setLoadingData(false)
    }
    if (loadingData) {
      getData();
    }
  }, [])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.filter((val) => {
        if (searchTerm == "") {
          return val
        } else if (
          val.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.idGuia.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.fechaNacimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.turno.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.horasRealizadas.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.genero.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val
        }
      }).map((n) => n.idGuia);
      setSelected(newSelecteds);
      setSelectedList(rows.filter((val) => {
        if (searchTerm == "") {
          return val
        } else if (
          val.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.idGuia.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.fechaNacimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.turno.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.horasRealizadas.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.genero.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val
        }
      }).map(x => x["idGuia"])) //select all ids handler
      return;
    } else {
      setSelectedList([])
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    handleSelectID(id)
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectID = (id) => {
    //id selection handling for 'Prestador' checkbox is in handleSelectAllClick function
    if (selectedList.indexOf(id) === -1) {
      
      setSelectedList([...selectedList, id])
    }else {
      setSelectedList(selectedList.filter(item => item !== id))

    }
    // if (selectedList.indexOf(id) === -1) {
    // } else {
    // }
  };

  const handleDeleteGuides = async () => {
    if (selectedList.length !== 0) {
      await deleteGuides(selectedList)
      setRows(await guias())
      setSelectedList(selectedList.filter(item => item === ""))
      setSelected([])
      setHours("")
    } else {
      console.log("Seleccione prestador(es)");
    }
  }


  const handleAgregarHoras = async () => {
    if ((hours !== 0 && hours !== "") && selectedList.length !== 0) {
      await updateHours([hours, selectedList])
      setRows(await guias())
      setSelectedList(selectedList.filter(item => item === ""))
      setSelected([])
      setHours("")
    } else {
      console.log("Ingrese horas y seleccione prestador(es)");
    }
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const HorasTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 265,
      fontSize: theme.typography.pxToRem(13),
    },
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className="toolbar-tools-container">
          <div className="searchInput-guias-items">
            <h5>Buscar:</h5>
            <input
              type="text"
              placeholder="Ingrese dato del guía"
              onInput={(e) => { setSearchTerm(e.target.value) }}
            />
            <Tooltip title="Refrescar tabla" placement="right" arrow>
              <div className="refresh-table-button">
                <FiRefreshCcw
                  onClick={async () => {
                    setRows(await guias())
                  }}
                />
              </div>
            </Tooltip>
          </div>
          <div className="agregar-horas-items">
            <EditarStatusButton>
              Editar estatus
            </EditarStatusButton>
            <TrashIcon
              cursor={"pointer"}
              onClick={()=>{
                setConfirmationDialog(true);
              }}
            />
            <ConfirmationDialog
              open={confirmationDialog}
              guides={selectedList}
              setDialog={()=>setConfirmationDialog(false)}
              setSelectedList={()=>setSelectedList(selectedList.filter(item => item === ""))}
              setSelected={()=>setSelected([])}
            />
            <input
              type="number"
              placeholder="Ingrese horas"
              value={hours}
              onInput={(e) => { setHours(e.target.value) }}
            />
            <ModalAlert 
              isOpen={isOpen}
              closeModal={()=>{
                setIsOpen(false)
              }}
            />
            <HorasTooltip
              title="Para agregar horas ingrese número positivo. Para restar horas ingrese número negativo." placement="top" arrow>
              <AddHorasButton
                onClick={() => {
                  if ((hours !== 0 && hours !== "") && selectedList.length !== 0) {
                    setDialog(true)
                  } else {
                    setIsOpen(true)
                  }
                }}
              >
                Agregar horas
              </AddHorasButton>
            </HorasTooltip>
            <Dialog
              open={dialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Agregar ${hours} hora(s) a:`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <ul>
                    {selectedList.map(x => {
                      return <li><b>{`${x}`}</b></li>
                    })}
                  </ul>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {
                  setDialog(false)
                  setSelectedList(selectedList.filter(item => item === ""))
                  setSelected([])
                  setHours("")
                }}>Cancelar</Button>
                <Button onClick={() => {
                  handleAgregarHoras()
                  setSelectedList(selectedList.filter(item => item === ""))
                  setSelected([])
                  setDialog(false)
                  setHours("")
                }} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.filter((val) => {
                if (searchTerm == "") {
                  return val
                } else if (
                  val.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.idGuia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.fechaNacimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.turno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.horasRealizadas.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.genero.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val
                }
              }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.idGuia);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick(event, row.idGuia)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      key={row.idGuia}
                      id={row.idGuia}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          id={row.idGuia}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onChange={(e) => {
                            handleClick(e, row.idGuia, e.target.id)
                            //handleSelectID(e, e.target.id)
                          }}
                        />

                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left">{row.idGuia}</TableCell>
                      <TableCell align="left">{row.fechaNacimiento}</TableCell>
                      <TableCell align="left">{row.turno}</TableCell>
                      <TableCell align="left">{row.servicio}</TableCell>
                      <TableCell align="left">{row.horasRealizadas}</TableCell>
                      <TableCell align="left">{row.genero}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          labelRowsPerPage={"Filas por página:"}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
export default Guias