export interface EditExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  expenseToEdit: any;
  refreshExpenses: () => void;
}
