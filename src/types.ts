export const STICKY = 'sticky';

export enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum SORT_METHOD {
  UP = 'asc',
  DOWN = 'desc',
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  sticky?: boolean;
}

export interface TableRow<T> {
  data: T;
  index: number;
}

export type TableData<T> = TableRow<T>[];

export interface ColumnDef {
  key: string;
  label: string;
  sort?: boolean;
  sticky?: 'left' | 'right';
  [key: string]: any;
}

export interface DataTableProps {
  columns: ColumnDef[];
  data: any[];
  pageSize: number;
}
