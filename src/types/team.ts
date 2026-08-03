export interface DeptMember {
  name: string;
  role: string;
}

export interface DeptCardProps {
  id: string;
  department: string;
  subtitle: string;
  description: string;
  headName: string;
  headRole: string;
  headPhoto: string;
  linkedin?: string;
  members: DeptMember[];
}
