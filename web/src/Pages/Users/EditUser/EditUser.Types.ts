export interface User {
  firstName: string;
  lastName: string;
  email: string;
  _id?: string;
}

export interface EditUserDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (updatedUser: User) => void;
}
