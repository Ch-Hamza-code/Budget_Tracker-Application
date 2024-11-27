import * as React from "react";
import { TableContainerStyled } from "./Table.Styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  LinearProgress,
} from "@mui/material";
import { TabledataProps } from "./Table.Types";

const excludedKey = ["id", "_id", "__v"];

const TableComponent: React.FC<TabledataProps> = ({ columns, data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainerStyled>
      <div className="sidebar"></div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns?.map((column: any) => (
                <TableCell>{column?.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((column: any) => (
              <TableRow key={column?.id}>
                {Object.keys(column)
                  .filter((key) => !excludedKey.includes(key)) // Exclude "id" key
                  .map((key) => (
                    <TableCell key={key}>{column[key]}</TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </TableContainerStyled>
  );
};

export default TableComponent;
