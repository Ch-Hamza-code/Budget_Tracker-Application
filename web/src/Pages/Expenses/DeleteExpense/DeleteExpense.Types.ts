export interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  expenseToDelete: { _id: string; title: string } | null;
  refreshExpenses: () => void;
}
