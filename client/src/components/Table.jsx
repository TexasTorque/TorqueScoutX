import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

import Null from "./Null";
import { useNavigate } from "react-router-dom";

import { default as BootstrapTable } from 'react-bootstrap/Table';
// This is to avoid name conflict between the react-bootstrap 
// table and our table.
// 
// This is like "import this as that" in Python

const Table = ({ json, columns, defaultSortField, excludingAccessorsArray }) => {
  const [data, setData] = useState(json);
  const navigate = useNavigate();
  const [excludingAccessors] = useState(excludingAccessorsArray ?? []); //excluding accessors will ideally be replaced when custom columns are implemented
  const [sortField, setSortField] = useState(null);

  useEffect(() => {
    setData(json)
    
    
  }, [json]);

  useEffect(()=> {
    setSortField()
  }, [data])

  useEffect(() => {
    if (sortField == null) return;

    const sorted = data.sort((a, b) => { return b[field] - a[field]; });

    setData(sorted);
  }, [sortField]);



  return (
    <>
      <BootstrapTable striped bordered hover>
        <thead className="tbl">
          <tr>
            {columns.map(({ label, accessor, sortable }) => (
              excludingAccessors.includes(accessor) ? null :
                <th>
                  {sortable ? (
                    <Button
                      variant="link"
                      className=""
                      onClick={() => setSortField(accessor)}
                    >
                      {label}
                    </Button>
                  ) : label}
                </th>
            ))}
          </tr>
        </thead>
        {data && Object.keys(data).length !== 0 ?
          <tbody className="tbl">
            {data.map(row => (
              <tr>
                {columns.map(({ accessor }) => {
                  if (excludingAccessors.includes(accessor)) return null;
                  else if (accessor === "Team") {
                    return (
                      <td>
                        <Button
                          variant="link"
                          style={{ color: "blue" }}
                          onClick={() => navigate(`/analysis/team/${row["Team"]}`)}
                        >
                          {row[accessor]}
                        </Button>
                      </td>
                    );
                  } else {
                    const cell = row[accessor];
                    return <td>{cell === null ? "N/A" : (typeof cell === "boolean" ? cell.toString() : cell)}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
          : <Null />}
      </BootstrapTable>
    </>
  );
};

export default Table;

export const makeColumn = (label, accessor, sortable = true) => {
  return { label: label, accessor: accessor, sortable: sortable };
};
