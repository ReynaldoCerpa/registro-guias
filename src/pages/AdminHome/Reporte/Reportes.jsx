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
    const [day, setDay] = useState(false);
    const [month, setMonth] = useState(false);
    const [year, setYear] = useState(false);
    const [checked, setChecked] = useState(null);
    const [buttonTitle, setButtonTitle] = useState("")
    const [reportData, setReportData] = useState([])

    const handleDay = () => {
        setDay(!day);
        setMonth(false);
        setYear(false);
        setButtonTitle("del Día")
        !day ? setChecked("day") : setChecked(null);
    }

    const handleMonth = () => {
        setDay(false);
        setMonth(!month);
        setYear(false);
        setButtonTitle("del Mes")
        !month ? setChecked("month") : setChecked(null);
    }

    const handleYear = () => {
        setDay(false);
        setMonth(false);
        setYear(!year);
        setButtonTitle("del Año")
        !year ? setChecked("year") : setChecked(null);
    }

    const handleGenerateReport = async () => {
        if (checked) {
            let data = await reports(checked)
            setReportData(data)
            console.log("Data: ",data);
        } else {
            console.log("Seleccione duracion de reporte");
        }
    }

    let dayData = []

    useEffect(() => {
        console.log("updated state");
        async function getData() {
            setRows(await dailyReports())
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
                    <div className="reportes-checkboxes">
                        <Checkbox
                            color="primary"
                            checked={day}
                            onClick={handleDay}
                        />
                        <h4>Día</h4>
                        <Checkbox
                            sx={{ margin: 0 }}
                            color="primary"
                            checked={month}
                            onClick={handleMonth}
                        />
                        <h4>Mes</h4>
                        <Checkbox
                            color="primary"
                            checked={year}
                            onClick={handleYear}
                        />
                        <h4>Año</h4>
                    </div>
                    <ExcelFile element={
                        <ReportButton
                            onClick={async () => {
                                //await handleGenerateReport()
                                dayData = await reports("day")
                                console.log("Report data to excel: ",dayData);
                            }}
                        >
                            Generar reporte {day || month || year ? buttonTitle : ""}
                        </ReportButton>
                    }
                    filename="Exceltutorial">
                        <ExcelSheet data={dayData} name="datos">
                            <ExcelColumn label="total" value="total"/>
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