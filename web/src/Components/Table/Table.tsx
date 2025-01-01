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
} from "@mui/material";
import { TabledataProps } from "./Table.Types";

const excludedKey = ["id", "_id"];

const TableComponent: React.FC<TabledataProps> = ({
  columns,
  data,
  page,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TableContainerStyled>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns?.map((column: any, index: number) => (
                <TableCell
                  key={index}
                  style={{
                    fontWeight: column.bold ? "bold" : "normal",
                  }}
                >
                  {column?.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableRow key={row?.id || row?._id}>
                {Object.keys(row)
                  .filter((key) => !excludedKey.includes(key))
                  .map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPages}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => onPageChange(newPage)}
          onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
        />
      </TableContainer>
    </TableContainerStyled>
  );
};

export default TableComponent;
