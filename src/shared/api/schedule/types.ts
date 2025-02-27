export interface StaffSchedule {
  employeeId: string;
  employeeName: string;
  postId: string;
  postName: string;
  divisionId: string;
  divisionName: string;
  periodStart: string;
  periodEnd: string;
}

export interface EmployeeFilter {
  employeeId: string;
  employeeName: string;
}

export interface PostFilter {
  postId: string;
  postName: string;
}

export interface DivisionFilter {
  divisionId: string;
  divisionName: string;
}

export interface EquipmentFilter {
  equipmentId: string;
  equipmentName: string;
}

export interface NomenclatureFilter {
  nomenclatureId: string;
  nomenclatureName: string;
}

export interface ScheduleRecord {
  recordStatusId: string;
  recordStatusName: string;
  employeeId: string;
  employeeName: string;
  postId: string;
  postName: string;
  divisionId: string;
  divisionName: string;
  clientId: string;
  clientName: string;
  clientStatusName: string;
  phone: string;
  periodStart: string;
  periodEnd: string;
  nomenclatureArray: {
    nomenclatureId: string;
    nomenclatureName: string;
  }[];
}

export interface WorkScheduleResponse {
  staff: StaffSchedule[];
  records: ScheduleRecord[];
}
