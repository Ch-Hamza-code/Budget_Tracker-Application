export interface Tabledata {
  id: number;
  name: string;
  percentage: number;
  price: number;
  date: string;
  user: string;
  
}
  export interface TableHeaderType {
    header: string
  }

export interface TabledataProps {
    columns: TableHeaderType[]
    data: any[]
    expenses?: TabledataProps[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  }
