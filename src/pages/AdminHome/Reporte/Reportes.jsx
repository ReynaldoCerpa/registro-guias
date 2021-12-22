import "./Reportes.css"
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { reports } from "./getDailyReports";
import Tooltip from '@mui/material/Tooltip';
import { FiRefreshCcw } from "react-icons/fi"

const Reportes = () => {

    const [rows, setRows] = useState([])
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        async function getData() {
            setRows(await reports())
            setLoadingData(false)
        }
        if(loadingData){
            getData();
        }
      }, [])

  return (
      <div className="reportes-container">
        <div className="data-table">
            <div>
                <h3>Registros del día</h3>
                <Tooltip title="Refrescar tabla" placement="left" arrow>
                    <div className="refresh-table-button">
                        <FiRefreshCcw
                        onClick={async()=>{
                            setRows(await reports())
                        }}
                        />
                    </div>
                </Tooltip>
            </div>
            <TableContainer component={Paper}
            sx={{maxHeight: 500, overflowY: "scroll",backgroundColor: "#f5f5f5"}}
            >
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Hora de entrada</TableCell>
                    <TableCell align="center">Hora de salida</TableCell>
                </TableRow>
                </TableHead>
                <TableBody
                
                >
                {rows.map((row) => (
                    <TableRow
                    key={row.idGuia}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.nombre}
                    </TableCell>
                    <TableCell align="left">{row.idGuia}</TableCell>
                    <TableCell align="center">{row.entrada}</TableCell>
                    <TableCell align="center">{row.salida}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
      </div>
  );
}

export default Reportes