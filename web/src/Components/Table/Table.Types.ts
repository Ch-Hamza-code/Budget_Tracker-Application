export interface Tabledata {
  id: number;
  name: string;
  percentage: number;
  price: number;
  date: string;
  user: string;
}
export interface TableHeaderType {
  header: string;
}

export interface TabledataProps {
  columns: Array<{ header: string; bold?: boolean }>;
  data: any[];
  page: number;
  rowsPerPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;

  expenses?: TabledataProps[];
}
