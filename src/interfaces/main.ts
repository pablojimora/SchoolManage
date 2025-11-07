export interface UserCardProps {
  id: string;
  userName: string;
  email: string;
  roleName: string;
  onEdit: () => void;
  onDelete: () => void;
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

