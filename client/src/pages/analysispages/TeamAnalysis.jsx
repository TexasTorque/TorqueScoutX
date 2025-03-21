import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, getMatchesPerTeam } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Table, { makeColumn } from "../../components/Table";
import ButtonFull from "../../components/ButtonFull";
import Group from "../../components/Group";
import Null from "../../components/Null";

// Summarize in four sections: Telelop Autos Defense Endgame
// Ranking in stars


const AnalysisIndex = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const { team } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, loading]);

  useEffect(() => {
    getMatchesPerTeam(team).then((data) => {
      populateColumns(data);
      setTeamData(processData(data));
    });
  }, [team]);

  const populateColumns = (data) => {
    console.log(data);
    let clmTemp = [
      makeColumn("Scouter", "Scouter", true),
      makeColumn("Match", "Match", true),
      makeColumn("Team", "Team", true),
      makeColumn("Points", "Points", true),
      makeColumn("Alliance", "Alliance", true),
    ];
    // Object.keys(data[0]).forEach((key) => {
    //     clmTemp = [...clmTemp, makeColumn(key, key.replace(/\s/g, '').replaceAll('.', ''), true)];
    // });
    data[0].fields.forEach((key) => {
      clmTemp = [
        ...clmTemp,
        makeColumn(
          key.name,
          key.name.replace(/\s/g, "").replaceAll(".", ""),
          true
        ),
      ];
    });
    setColumns(clmTemp);
  };

  const processData = (data) => {
    // return data.map((row) => {
    //     let toReturn = {};
    //     Object.keys(row).forEach((name) => {
    //         toReturn[name.replace(/\s/g, '').replaceAll('.', '')] = row[name].value ?? row[name];
    //     });
    //     return toReturn;
    // });

    return data.map((e) => {
      let toReturn = {};

      toReturn["Alliance"] = e["Alliance"];
      toReturn["Match"] = e["Match"];
      toReturn["Points"] = e["Points"];
      toReturn["Scouter"] = e["Scouter"];
      toReturn["Team"] = e["Team"];

      e.fields.forEach((row) => {
        // console.log("row", row)
        toReturn[row.name.replace(/\s/g, "").replaceAll(".", "")] = row.value;
      });

      return toReturn;
    });
  };

  return teamData && Object.keys(teamData).length !== 0 ? (
    <div className="home">
      <div className="mt-4" style={{ width: "200%" }}>
        <Group name={"Data for Team " + team}>
          <ButtonFull
            name="Back to Analysis"
            callback={() => navigate("/analysis/analysis-index")}
          />
          <br></br>
          <div className="table-container">
            <Table
              json={teamData}
              columns={columns}
              excludingAccessorsArray={["Team"]}
              defaultSortField="Match"
            />{" "}
            {/*// add default sortfield later*/}
          </div>
        </Group>
      </div>
    </div>
  ) : (
    <Null />
  );
};

export default AnalysisIndex;
