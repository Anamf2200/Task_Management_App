export enum TaskStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In Progress',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;  
  createdby: number;
}
