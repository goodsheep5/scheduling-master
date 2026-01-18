
export enum UserRole {
  ADMIN = 'ADMIN',
  SCHEDULER = 'SCHEDULER',
  STAFF = 'STAFF'
}

export interface Employee {
  id: string;
  name: string;
  role: UserRole;
  station: string[];
  maxWeeklyHours: number;
  ptRate?: number;
  phone?: string;
  address?: string;
  healthCheckDate?: string;
}

export interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  startTime: string;
  endTime: string;
  station: string;
  date: string;
}
