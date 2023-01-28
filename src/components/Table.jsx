import React, { useState, useEffect } from "react";

import { auth, logout, getUserFromID } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Null from "./Null";
import Loader from "./Loader";

import { default as BootstrapTable } from 'react-bootstrap/Table';
// This is to avoid name conflict between the react-bootstrap 
// table and our table.
// 
// This is like "import this as that" in Python


export const makeColumn = (label, accessor, sortable = true) => {
  return { label: label, accessor: accessor, sortable: sortable };
};

const Table = ({ json, columns, defaultSortField }) => {
  const navigate = useNavigate();

  const [sortField, setSortField] = useState(defaultSortField);
  const [data, setData] = useState(json);

  useEffect(() => setData(json), [json, data]);

  const handleSort = (field) => {
    setSortField(field);

    if (field == null) return;

    const sorted = data.sort((a, b) => {
      if (a[field] < b[field]) return 1;
      if (a[field] > b[field]) return -1;
      return 0;
    });

    setData(sorted);
  };

  return (
    <>
      <BootstrapTable striped bordered hover>
        <thead className="tbl">
          <tr>
            {columns.map(({ label, accessor, sortable }) => (
              <th>
                {sortable ? (
                  <Button
                    variant="link"
                    className=""
                    onClick={() => handleSort(accessor)}
                  >
                    {label}
                  </Button>
                ) : label}
              </th>
            ))}
          </tr>
        </thead>
        {/* {data == null ? <Null /> : (
          <tbody className="tbl">
            {data.map(row => (
              <tr>
                {columns.map(({ accessor }) => {
                  if (accessor === "Team") {
                    return (
                      <td>
                        <Button
                          variant="link"
                          style={{ color: "blue" }}
                          onClick={() => navigate(`/team/${row["Team"]}`)}
                        >
                          {row[accessor]}
                        </Button>
                      </td>
                    );
                  } else {
                    const cell = row[accessor];
                    return <td>{cell == null ? "N/A" : cell}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        )} */}
      </BootstrapTable>
    </>
  );
};

export default Table;
