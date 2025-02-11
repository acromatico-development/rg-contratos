import { IColumn } from '@interface'

interface TableHeaderProps {
  columns: IColumn[];
  hasMenu?: boolean;
}

export const TableHeader = ({ columns, hasMenu }: TableHeaderProps) => {
  return (
    <thead className="bg-white">
      <tr>
        {columns.map((column) => (
          !column.hidden && (
            <th
              key={column.accessor}
              scope="col"
              className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              {column.header}
              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
            </th>
          )
        ))}
        {hasMenu && <th className="w-16"></th>}
      </tr>
    </thead>
  );
}; 