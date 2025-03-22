import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, getTeamReports } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Table, { makeColumn } from "../../components/Table";
import ButtonFull from "../../components/ButtonFull";
import Group from "../../components/Group";
import Null from "../../components/Null";
import { getActiveSchema } from "../../firebase";
import { averagePoints, averageValue } from "../../Custom";

const CUFS = {
  averagePoints: averagePoints,
  averageValue: averageValue,
};

const CustomAnalysis = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [allData, setAllData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [activeSchema, setActiveSchema] = useState({});

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    getActiveSchema().then((schema) => {
      setActiveSchema(schema);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(activeSchema).length === 0) return;

    const populateColumns = (data) => {
      let clmTemp = [makeColumn("Team", "Team", true)];
      // Object.keys(data[0]).forEach((key) => {
      //     clmTemp = [...clmTemp, makeColumn(key, key.replace(/\s/g, '').replaceAll('.', ''), true)];
      // });
      // console.log("clmTemp", clmTemp)

      // console.log(data[0][Object.keys(data[0])[0]].reports[0])

      // data[0][Object.keys(data[0])[0]].reports[0].fields.forEach((key) => {
      //     clmTemp = [...clmTemp, makeColumn(key.name, key.name.replace(/\s/g, '').replaceAll('.', ''), true)];
      // });

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

      setColumns(clmTemp);
    };

    const processData = (data) => {
      populateColumns(data);

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
      console.log("allData", allData);

      setAllData(allData);
    };

    getTeamReports().then((data) => {
      processData(data);
    });
  }, [activeSchema]);

  return columns.length > 0 ? (
    <div className="home">
      <div className="mt-4" style={{ width: "200%" }}>
        <Group name="Custom Analysis">
          <ButtonFull
            name="Back to Analysis"
            callback={() => navigate("/analysis/analysis-index")}
          />
          <br></br>
          <div className="table-container">
            <Table json={allData} defaultSortField="Points" columns={columns} />
          </div>
        </Group>
      </div>
    </div>
  ) : (
    <Null />
  );
};

export default CustomAnalysis;
