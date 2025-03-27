import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, getTeamReports } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Table, { makeColumn } from "../../components/Table";
import ButtonFull from "../../components/ButtonFull";
import Group from "../../components/Group";
import Null from "../../components/Null";
import { getActiveSchema } from "../../firebase";
import { averagePoints, averageValue, booleanPercentage } from "../../Custom";
import Button from "react-bootstrap/Button";
import Papa from 'papaparse'

const CUFS = {
  averagePoints: averagePoints,
  averageValue: averageValue,
  booleanPercentage: booleanPercentage,
};

const Averages = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [allData, setAllData] = useState([]);
  const [allDataTable, setAllDataTable] = useState([]);

  const [columns, setColumns] = useState([]);
  const [activeSchema, setActiveSchema] = useState({});

  const [searchQuery, setSearchQuery] = useState("");

  const [allDataSave, setAllDataSave] = useState([]);

  useEffect(() => {
    //if (searchQuery === "") return;
    let temp = allData.filter((row) => {
      return searchQuery === ""
        ? true
        : row.Team.substring(0, searchQuery.length) === searchQuery;
    });
    setAllDataTable(temp);
  }, [searchQuery, allData]);

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    getActiveSchema().then((schema) => {
      setActiveSchema(schema);
    });
  }, []);

  const exportToCSV = () => {
    const transformedData = allData.map((item) => {
      let temp = {};
      Object.keys(item).forEach((key) => {
        if (key === "Team") {
          temp[key] = item[key];
        } else if (key === "StartingPos") {
          return;
        } else {
          temp[key] = item[key].toString();
        }
      });
      return temp;
    });

    const csv = Papa.unparse(transformedData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (Object.keys(activeSchema).length === 0) return;

    const populateColumns = (data) => {
      let clmTemp = [makeColumn("Team", "Team", true)];

      activeSchema.schema.analysisGroups.forEach((group) => {
        clmTemp = [
          ...clmTemp,
          makeColumn(
            group.name,
            group.name.replace(/\s/g, "").replaceAll(".", ""),
            true
          ),
        ];
      });

      // Object.keys(data[0]).forEach((key) => {
      //     clmTemp = [...clmTemp, makeColumn(key, key.replace(/\s/g, '').replaceAll('.', ''), true)];
      // });
      data[0][Object.keys(data[0])[0]].reports[0].fields.forEach((key) => {
        if (typeof key.value === "string") {
          clmTemp = [
            ...clmTemp,
            makeColumn(
              key.name + " Points",
              key.name.replace(/\s/g, "").replaceAll(".", ""),
              true
            ),
          ];
        } else {
          clmTemp = [
            ...clmTemp,
            makeColumn(
              key.name,
              key.name.replace(/\s/g, "").replaceAll(".", ""),
              true
            ),
          ];
        }
      });
      console.log(clmTemp);
      setColumns(clmTemp);
    };

    const processData = (data) => {
      populateColumns(data);

      let analysisGroups = [];

      data[0][Object.keys(data[0])[0]].reports[0].fields.forEach((key) => {
        if (typeof key.value === "number") {
          analysisGroups.push({
            mode: "averageValue",
            name: key.name,
            fields: [key.name],
          });
        } else if (typeof key.value === "boolean") {
          analysisGroups.push({
            mode: "booleanPercentage",
            name: key.name,
            fields: [key.name],
          });
        } else {
          analysisGroups.push({
            mode: "averagePoints",
            name: key.name,
            fields: [key.name],
          });
        }
      });

      let allData = [];

      data.forEach((tm) => {
        const team = Object.keys(tm)[0];
        allData.push({ Team: team });
      });

      for (let i = 0; i < analysisGroups.length; i++) {
        let temp = CUFS[analysisGroups[i].mode](data, analysisGroups[i]);
        for (let i = 0; i < temp.length; i++) {
          for (let j = 0; j < allData.length; j++) {
            if (allData[j].Team === temp[i].Team) {
              allData[j] = { ...allData[j], ...temp[i] };
            }
          }
        }
      }

      console.log(
        customProcessData(data).map((e, i) => {
          return { ...e, ...allData[i] };
        })
      );

      let temp = customProcessData(data).map((e, i) => {
        return { ...e, ...allData[i] };
      });

      setAllData(temp);
      setAllDataSave(temp);
    };

    const customProcessData = (data) => {
      let analysisGroups = activeSchema.schema.analysisGroups;
      console.log(analysisGroups);

      let allData = [];

      data.forEach((tm) => {
        const team = Object.keys(tm)[0];
        allData.push({ Team: team });
      });

      for (let i = 0; i < analysisGroups.length; i++) {
        let temp = CUFS[analysisGroups[i].mode](data, analysisGroups[i]);
        for (let i = 0; i < temp.length; i++) {
          for (let j = 0; j < allData.length; j++) {
            if (allData[j].Team === temp[i].Team) {
              allData[j] = { ...allData[j], ...temp[i] };
            }
          }
        }
      }

      console.log("boutta finish custom proces");
      return allData;
    };

    getTeamReports().then((data) => {
      processData(data);
    });
  }, [activeSchema]);

  useEffect(() => {
    setAllDataTable(allData);
  }, [allData]);

  const deleteTeam = () => {
    if (allDataTable.length > 1 || allDataTable.length < 1) {
      alert("Please search for only one team to delete!");
      return;
    }

    let temp = allData.filter((row) => {
      return searchQuery === ""
        ? true
        : row.Team.substring(0, searchQuery.length) !== searchQuery;
    });
    setAllData(temp);
    console.log(temp);
    setSearchQuery("");
  };

  const resetDeletes = () => {
    setAllData(allDataSave);
    console.log(allDataSave);
    setSearchQuery("");
  };

  return columns.length > 0 ? (
    <div className="home">
      <div className="mt-4" style={{ width: "200%" }}>
        <Group name="Averages">
          <div style={{ display: "flex" }}>
            <ButtonFull
              name="Back to Analysis"
              callback={() => navigate("/analysis/analysis-index")}
            />
            <input
              type="text"
              placeholder="Remove a team"
              style={{
                width: "8em",
                height: "2em",
                marginTop: "1.6em",
                marginLeft: "1em",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={() => deleteTeam()}
              style={{
                marginLeft: "1em",
                marginRight: "1em",
                height: "2.1em",
                marginTop: "1.6em",
              }}
              name="Delete"
            >
              Delete Team
            </Button>
            <Button
              onClick={() => exportToCSV()}
              style={{
                marginLeft: "1em",
                marginRight: "1em",
                height: "2.1em",
                marginTop: "1.6em",
              }}
              name="Export"
            >
              Export to CSV
            </Button>
            <Button
              onClick={() => resetDeletes()}
              style={{ height: "2.1em", marginTop: "1.6em" }}
              name="Reset All"
            >
              Reset All
            </Button>
          </div>

          <br></br>
          <div className="table-container">
            <Table
              json={allDataTable}
              defaultSortField="Points"
              columns={columns}
            />
          </div>
        </Group>
      </div>
    </div>
  ) : (
    <Null />
  );
};

export default Averages;
