import "./Reportes.css"
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { dailyReports } from "../../../db-conn/guides/getDailyReports";
import { reports } from "../../../db-conn/guides/generateReport";
import Tooltip from '@mui/material/Tooltip';
import { FiRefreshCcw } from "react-icons/fi"
import { ReportButton } from "../../../components/Buttons";
import ExportExcel from "react-export-excel-fixed-xlsx"

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const Reportes = () => {

    const [rows, setRows] = useState([])
    const [loadingData, setLoadingData] = useState(true);
    // const [day, setDay] = useState([]);
    // const [month, setMonth] = useState([]);
    // const [year, setYear] = useState([]);
    let today = new Date();
    let dayTitle = today.toLocaleString("es_MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    let day = [];
    let month = [];
    let year = [];
    //let dayTitle = `Reporte diario ${today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()}`;
    let monthTitle = "";
    let yearTitle = "";

    useEffect(() => {
        async function getData() {
            setRows(await dailyReports())
            // setDay(await reports("day"))
            // setMonth(await reports("month"))
            // setYear(await reports("year"))
            day = await reports("day")
            month = await reports("month")
            year = await reports("year")
            console.log("Daytitle: ",dayTitle);
            setLoadingData(false)
        }
        if (loadingData) {
            getData();
        }
    }, [])

    return (
        <div className="reportes-container">
            <div className="generar-reportes-container">
                <Typography
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Generar reporte estadístico
                </Typography>
                <div className="generar-reporte-controls-container">
                    <ExcelFile element={
                        <ReportButton>
                            Generar reporte diario
                        </ReportButton>
                    }
                        filename={dayTitle}>
                        <ExcelSheet data={day} name="datos">
                            <ExcelColumn label="Mayores de edad" value="mayores" />
                            <ExcelColumn label="Menores de edad" value="menores" />
                            <ExcelColumn label="Total" value="total" />
                            <ExcelColumn label="Turno matutino" value="matutino" />
                            <ExcelColumn label="Turno vespertino" value="vespertino" />
                            <ExcelColumn label="Turno mixto" value="mixto" />
                            <ExcelColumn label="Hombres" value="hombre" />
                            <ExcelColumn label="Mujeres" value="mujer" />
                            <ExcelColumn label="S.S.P." value="ssp" />
                            <ExcelColumn label="S.S.C." value="ssc" />
                            <ExcelColumn label="P.P." value="pp" />
                            <ExcelColumn label="Servicio liberado" value="liberado" />
                            <ExcelColumn label="Servicio incompleto" value="incompleto" />
                            <ExcelColumn label="Servicio baja" value="baja" />
                        </ExcelSheet>
                    </ExcelFile>
                    <ExcelFile element={
                        <ReportButton>
                            Generar reporte mensual
                        </ReportButton>
                    }
                        filename="Exceltutorial">
                        <ExcelSheet data={month} name="datos">
                            <ExcelColumn label="total" value="total" />
                        </ExcelSheet>
                    </ExcelFile>
                    <ExcelFile element={
                        <ReportButton>
                            Generar reporte anual
                        </ReportButton>
                    }
                        filename="Exceltutorial">
                        <ExcelSheet data={year} name="datos">
                            <ExcelColumn label="total" value="total" />
                        </ExcelSheet>
                    </ExcelFile>
                </div>
            </div>
            <div className="data-table">
                <div className="reportes-tools-container">
                    <Typography
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Registros del día
                    </Typography>
                    <Tooltip title="Refrescar tabla" placement="right" arrow>
                        <div className="refresh-table-button">
                            <FiRefreshCcw
                                onClick={async () => {
                                    setRows([])
                                    setRows(await dailyReports())
                                }}
                            />
                        </div>
                    </Tooltip>
                </div>
                <TableContainer component={Paper}
                    sx={{ height: "55vh", overflowY: "scroll", backgroundColor: "#f5f5f5" }}
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
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.idRegistro}
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