import { Tabledata } from "../../Components/Table/Table.Types";
export const sortExpenses = (expenses: Tabledata[], key: keyof Tabledata, ascending: boolean = true): Tabledata[] => {
  return expenses.sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
};

export const filterExpenses = (expenses: Tabledata[], searchTerm: string): Tabledata[] => {
  return expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
