export interface DeptMember {
  name: string;
  role: string;
  image: string;
}

export interface DeptCardProps {
  id: string;
  department: string;
  subtitle: string;
  description: string;
  headName: string;
  headRole: string;
  linkedin?: string;
  members: DeptMember[];
}
