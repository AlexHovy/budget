import React from "react";
import "./Table.css";
import Button from "../Button/Button";

interface TableColumn<T> {
  title: string;
  render: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onUpdate?: (item: T) => void;
  onDelete?: (item: T) => void;
}

const Table = <T extends { id: string }>({
  data,
  columns,
  onUpdate,
  onDelete,
}: TableProps<T>) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.title}</th>
          ))}
          {(onUpdate || onDelete) && (
            <th className="table-action-column">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column, index) => (
              <td key={index}>{column.render(item)}</td>
            ))}
            {(onUpdate || onDelete) && (
              <td className="table-action-column">
                {onUpdate && (
                  <Button
                    className="table-button edit"
                    onClick={() => onUpdate(item)}
                  >
                    Update
                  </Button>
                )}
                {onDelete && (
                  <Button
                    className="table-button delete"
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
