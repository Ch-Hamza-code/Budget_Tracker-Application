export interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  expenseTitle: string;
}
