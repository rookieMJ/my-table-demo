import React, { useState, useEffect, useRef } from 'react';
import { DataTableProps, DIRECTION, STICKY, SORT_METHOD } from './../../types';
import './index.css';

const DataTable: React.FC<DataTableProps> = ({ columns, data, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [fixedLeftWidth, setFixedLeftWidth] = useState<number>(0); // 记录靠左固定的列宽总和
  const [fixedRightWidth, setFixedRightWidth] = useState<number>(0); // 记录靠右固定的列宽总和

  const [tableData, setTableData] = useState([...data]);

  const tableRef = useRef<HTMLDivElement>(null);

  const handleSort = (key: string) => {
    if (key === sortedColumn) {
      setSortDirection(sortDirection === SORT_METHOD.UP ? SORT_METHOD.DOWN : SORT_METHOD.UP);
    } else {
      setSortedColumn(key);
      setSortDirection(SORT_METHOD.UP);
    }
  };

  // 计算已固定的左列和右列宽度
  const calculateFixedWidths = () => {
    let totalLeftWidth = 0;
    let totalRightWidth = 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sticky === DIRECTION.LEFT) {
        totalLeftWidth += columns[i].width + 49; // th padding: 24
      } else if (columns[i].sticky === DIRECTION.RIGHT) {
        totalRightWidth += columns[i].width + 49;
      }
    }

    setFixedLeftWidth(totalLeftWidth);
    setFixedRightWidth(totalRightWidth);
  };

  useEffect(() => {
    calculateFixedWidths();
  }, [columns, calculateFixedWidths]);

  // eslint-disable-next-line to the line before.
  useEffect(() => {
    const sortedData = [...tableData].sort((a, b) => {
      if (sortedColumn) {
        if (sortDirection === 'asc') {
          return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
        } else {
          return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
        }
      }
      return 0;
    });

    setTableData(sortedData);
  }, [sortedColumn, sortDirection]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = tableData.slice(startIndex, endIndex);

  return (
    <div className="relative">
      {/* 表格 */}
      <div ref={tableRef} className="table-container">
        <table className="text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  style={{
                    width: `${column.width}px`,
                    position: [DIRECTION.LEFT, DIRECTION.RIGHT].includes(column.sticky as DIRECTION)
                      ? STICKY
                      : 'static',
                    zIndex: column.sticky ? 2 : '',
                    top: 0,
                    ...(column.sticky === DIRECTION.LEFT
                      ? { left: index === 0 ? 0 : `${fixedLeftWidth - column.width - 49}px` }
                      : ''),
                    ...(column.sticky === DIRECTION.RIGHT
                      ? {
                          right:
                            index === columns.length - 1
                              ? 0
                              : `${fixedRightWidth - column.width - 49}px`,
                        }
                      : ''),
                  }}
                  className={`py-3 px-6 cursor-pointer`}
                >
                  {column.label}
                  {sortedColumn === column.key && (
                    <span>{sortDirection === SORT_METHOD.UP ? '⬆' : '⬇'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                {columns.map((column, idx) => {
                  return (
                    <td
                      key={column.key}
                      className="py-4 px-6"
                      style={{
                        width: `${column.width}px`,
                        position: [DIRECTION.LEFT, DIRECTION.RIGHT].includes(
                          column.sticky as DIRECTION,
                        )
                          ? STICKY
                          : 'static',
                        zIndex: column.sticky ? 2 : '',
                        ...(column.sticky === DIRECTION.LEFT
                          ? { left: idx === 0 ? 0 : `${fixedLeftWidth - column.width - 49}px` }
                          : ''),
                        ...(column.sticky === DIRECTION.RIGHT
                          ? {
                              right:
                                idx === columns.length - 1
                                  ? 0
                                  : `${fixedRightWidth - column.width - 49}px`,
                            }
                          : ''),
                      }}
                    >
                      {row[column.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex flex-end mt-4 right-sticky">
        <button
          className="mr-4"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button disabled={endIndex >= data.length} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
