export interface AddExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  userEmail: string;
}

export interface ExpenseFormValues {
  title: string;
  price: number;
  date: string;
}
