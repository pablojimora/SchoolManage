export interface UserCardProps {
  id: string;
  userName: string;
  email: string;
  roleName: string;
  onEdit: () => void;
  onDelete: () => void;
}