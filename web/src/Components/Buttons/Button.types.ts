export interface ButtonProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    variant?: 'contained'| 'outlined' | 'text' ;
    color?: 'inherit'| 'primary'| 'secondary'| 'success'| 'error'| 'info'| 'warning';
    href?: string
    
  }