export interface UserCardProps {
  id: number;
  userName: string;
  email: string;
  roleName: string;
  onEdit: (user: { id: number; userName: string; email: string; password?: string; roleName: string, roleId: number; }) => void;
  onDelete: () => void;
}

export interface User {
  userName: string;
  email: string;
  password: string;
  roleId: 1 | 2;
}
export interface StudentCardProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  created_at: string;
  onEdit: () => void;
  onDelete: () => void;
}

