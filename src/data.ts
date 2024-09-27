import { ColumnDef } from './types';

import generateData from './utils';

// 列配置
const columns: ColumnDef[] = [
  { key: 'id', label: 'ID', width: 100 },
  { key: 'name', label: 'Name', width: 200, sticky: 'left' },
  { key: 'age', label: 'Age', width: 100 },
  { key: 'email', label: 'Email', width: 450 },
  { key: 'phone', label: 'PhoneBrand', width: 200 },
  { key: 'desc', label: 'SelfEvaluation', width: 400 }, //sticky: 'right'
  { key: 'luckNum', label: 'luckyNumber', width: 300 },
];

// 生成数据
const numData = 30;
const data: any[] = generateData(numData);

export { columns, data };
