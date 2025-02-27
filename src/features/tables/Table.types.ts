export enum EFilerType {
  Text,
  Number,
  NumberRange,
  Date,
  Search,
  Select,
}

export interface ICellMeta {
  filterable: boolean;
  filterType: EFilerType;
  width?: string;
}

export interface DataItem {
  id: number;
  date: Date;
  timeInterval: string;
  client: {
    name: string;
    phone: string;
  };
  employee: {
    name: string;
    position: string;
  };
  services: string[];
  amount: number;
  branch: string;
}
