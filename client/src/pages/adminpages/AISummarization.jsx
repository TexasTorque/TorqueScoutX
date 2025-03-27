import React, { useEffect, useState, useRef } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  doesSchemaExist,
  getActiveSchema,
  getCachedTeamAISummarize,
  getTeamReports,
  listTeams,
  updateTeamAISummarize,
} from "../../firebase";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Group from "../../components/Group";
import ButtonFull from "../../components/ButtonFull";
import Papa from "papaparse";

import { GoogleGenerativeAI } from "@google/generative-ai";
import Button from "react-bootstrap/Button";

const AISummarization = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [team, setTeam] = useState("");

  const [teleop, setTeleop] = useState("");
  const [autos, setAutos] = useState("");
  const [defense, setDefense] = useState("");
  const [endgame, setEndgame] = useState("");
  const [ranking, setRanking] = useState(0);
  const [reasoning, setReasoning] = useState("");
  const [allTeamSummary, setAllTeamSummary] = useState([]);

  const [model, setModel] = useState(null);
  const [teams, setTeams] = useState([]);

  const shouldStopRef = useRef(false);

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [allTeamProgress, setAllTeamProgress] = useState(0);

  const [lastLoadedPosition, setLastLoadedPosition] = useState(-1);

  useEffect(() => {
    async function initGenAI() {
      const response = await fetch('/.netlify/functions/getSecret');
      const data = await response.json();
      const genAI = new GoogleGenerativeAI(data.apiKey);
      setModel(genAI.getGenerativeModel({ model: "gemini-2.0-flash" }));
    }

    initGenAI();
  }, []);

  const summarize = async (data) => {
    const notes = data.map((item) => item.fields[18].value);
    const points = data.map((item) => item.Points);
    const preload = data.map((item) => item.fields[1].value);
    // const leave = data.map(item => item.Leave);
    // const netauto = data.map(item => item.NetAuto);
    // const processorauto = data.map(item => item.ProcessorAuto);
    // const l1auto = data.map(item => item.L1Auto);
    // const l2auto = data.map(item => item.L2Auto);
    // const l3auto = data.map(item => item.L3Auto);
    // const l4auto = data.map(item => item.L4Auto);
    // const nettele = data.map(item => item.NetTele);
    // const processortele = data.map(item => item.ProcessorTele);
    // const l1tele = data.map(item => item.L1Tele);
    // const l2tele = data.map(item => item.L2Tele);
    // const l3tele = data.map(item => item.L3Tele);
    // const l4tele = data.map(item => item.L4Tele);
    const barge = data.map((item) => item.fields[15].value);
    const park = data.map((item) => item.fields[16].value);
    // const broken = data.map(item => item.Broken);
    const defense = data.map((item) => item.fields[19].value);

    const system = `
You are a summarizer ai for a FIRST robotics scouting application. 
You will get notes from the scouters and you need to summarize the final performance for the bot. 
You should summarize in four categories: Autonomous Period, Teleop Period, Defense (if applicable), and Endgame as well as give a rating out of 10 in general and explain why. 
        
Notably, no defense is not a bad thing. It just means that the robot did not play defense.

Generate a robot performance summary in JSON format based on the given input. The JSON should include fields for "autonomous_period", "teleop_period", "defense", "endgame", "overall_rating", and "reasoning". If no defense information is available, use a standardized fallback message: "No defense data available."

The overall rating should be reasonable and not too harsh. The rating should how likely the robot is to be picked by an alliance. 7-10 is a good pick, 4-6 is average, and 0-3 is a bad pick.

Terms you should know:
Pancake - means a bot that is only a drivebase and no scoring mechanism. These are ONLY good if they are fast and can play defense.

Ensure the JSON output follows this structure:

{
  "autonomous_period": "...",
  "teleop_period": "...",
  "defense": "...",
  "endgame": "...",
  "overall_rating": "X/10",
  "reasoning": "..."
}

Example Input:
The robot performed well in autonomous but struggled with teleop. It had no defensive plays. Endgame was successful, but overall, the performance was average.

Example Output:
{
  "autonomous_period": "Performed well, scoring multiple points.",
  "teleop_period": "Struggled with accuracy and speed.",
  "defense": "No defense data available.",
  "endgame": "Successfully completed the endgame objective.",
  "overall_rating": "5/10",
  "reasoning": "Strong autonomous, weak teleop, and good endgame, leading to an average rating."
}

Include in your reasoning if they would be a good pick for an alliance and why.

Use this structure and generate an appropriate response. You MUST use this structure only. You are only allowed to reply in proper json

This is the data from the scouters: 
`;

    // format preload data into a string
    let preload_true = 0;
    let preload_false = 0;
    preload.forEach((item) => {
      if (item === true) {
        preload_true++;
      } else if (item === false) {
        preload_false++;
      }
    });

    const preloadString = `
Preload:
Preloaded: ${preload_true}
Not preloaded: ${preload_false}
`;

    // format points data into a string
    let averageTotalPoints = 0;
    points.forEach((item) => {
      averageTotalPoints += item;
    });
    averageTotalPoints /= points.length;

    const pointsString = `
Points:
Average total points: ${averageTotalPoints}
`;

    // format the park data into a string
    let park_false = 0;
    let park_true = 0;
    park.forEach((item) => {
      if (item === false) {
        park_false++;
      } else if (item === true) {
        park_true++;
      }
    });

    const parkString = `
Endgame:
Parked: ${park_true}
Not parked: ${park_false} (could indicate either no parking or deep/shallow climb)
`;

    // format defense data into a string
    let defense_none = 0;
    let defense_good = 0;
    let defense_bad = 0;
    let defense_terrible = 0;
    let defense_mid = 0;
    defense.forEach((item) => {
      if (item === "None") {
        defense_none++;
      } else if (item === "Good") {
        defense_good++;
      } else if (item === "Bad") {
        defense_bad++;
      } else if (item === "Terrible") {
        defense_terrible++;
      } else if (item === "Mid") {
        defense_mid++;
      }
    });

    const defenseString = `
Defense:
No defense: ${defense_none}
Good defense: ${defense_good}
Bad defense: ${defense_bad}
Terrible defense: ${defense_terrible}
Mid defense: ${defense_mid}
`;

    // format the barge data into a string
    let deep = 0;
    let shallow = 0;
    let none = 0;
    barge.forEach((item) => {
      if (item === "Deep") {
        deep++;
      } else if (item === "Shallow") {
        shallow++;
      } else if (item === "No climb") {
        none++;
      }
    });

    const bargeString = `
Barge:
Successful deep climbs: ${deep}
Successful shallow climbs: ${shallow}
No climb: ${none}
`;

    // make a prompt
    const prompt =
      system +
      notes.join(" ") +
      defenseString +
      bargeString +
      parkString +
      pointsString +
      preloadString;
    console.log(prompt.length);

    const result = await model.generateContent(prompt);

    return JSON.parse(
      result.response.text().replace("```json", "").replace("```", "")
    );
  };

  const start_summarize = async () => {
    console.log("Summarizing...");

    if (await doesSchemaExist(await getActiveSchema().name)) {
      console.log("Schema exists");
    } else {
      console.log("Schema does not exist");
    }

    let documents = await getTeamReports(await getActiveSchema().name);

    let teamDocs = documents.filter((doc) => Object.keys(doc).includes(team));

    let reports = teamDocs[0][team].reports;

    let summarized = await summarize(reports);

    summarized.overall_rating = parseInt(summarized.overall_rating.split("/")[0]);

    let schema = await getActiveSchema().then((schema) => schema.name);
    updateTeamAISummarize(summarized, team, schema);

    setReasoning(summarized.reasoning);
    setTeleop(summarized.teleop_period);
    setAutos(summarized.autonomous_period);
    setDefense(summarized.defense);
    setEndgame(summarized.endgame);

    setRanking(summarized.overall_rating);
  };

  const start_summarize_all = async () => {
    console.log("Summarizing all...");

    setAllTeamSummary([]);

    if (await doesSchemaExist(await getActiveSchema().name)) {
      console.log("Schema exists");
    } else {
      console.log("Schema does not exist");
    }

    let documents = await getTeamReports(await getActiveSchema().name);

    setAllTeamProgress(0);

    if (lastLoadedPosition === -1) {
      console.log("Starting from the beginning");
      for (let i = 0; i < documents.length; i++) {
        let team = Object.keys(documents[i])[0];
        let reports = documents[i][team].reports;
        let summarized = ""

        try {
          summarized = await summarize(reports);
        } catch (e) {
          console.log(e);
          setLastLoadedPosition(i);
          break;
        }

        summarized.overall_rating = parseInt(
          summarized.overall_rating.split("/")[0]
        );
  
        let schema = await getActiveSchema().then((schema) => schema.name);
  
        setAllTeamSummary((prev) => [
          ...prev,
          { team: team, summary: summarized },
        ]);
        updateTeamAISummarize(summarized, team, schema);
        setAllTeamProgress(((i + 1) / documents.length) * 100);
  
        if (shouldStopRef.current) {
          setAllTeamProgress(0);
          shouldStopRef.current = false;
          return;
        }
      }
    } else {
      // continue from last loaded position
      console.log("Continuing from last loaded position");
      for (let i = lastLoadedPosition; i < documents.length; i++) {
        let team = Object.keys(documents[i])[0];
        let reports = documents[i][team].reports;
        let summarized = ""

        try {
          summarized = await summarize(reports);
        } catch (e) {
          console.log(e);
          setLastLoadedPosition(i);
          break;
        }
  
        summarized.overall_rating = parseInt(
          summarized.overall_rating.split("/")[0]
        );
  
        let schema = await getActiveSchema().then((schema) => schema.name);
  
        setAllTeamSummary((prev) => [
          ...prev,
          { team: team, summary: summarized },
        ]);
        updateTeamAISummarize(summarized, team, schema);
        setAllTeamProgress(((i + 1) / documents.length) * 100);
  
        if (shouldStopRef.current) {
          setAllTeamProgress(0);
          shouldStopRef.current = false;
          return;
        }
      }
    }
    
    setAllTeamProgress(100);
  };

  useEffect(() => {
    if (!user) return navigate("/login");
    if (user && !checkAdmin(user)) return navigate("/dashboard");
  }, [user, loading, navigate]);

  const exportToCSV = () => {
    const transformedData = allTeamSummary.map((item) => ({
      team: item.team,
      ...item.summary,
    }));

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

  const stopLoop = () => {
    shouldStopRef.current = true;
  };

  useEffect(() => {
    // Load all cached data
    const loadCachedData = async () => {
      setAllTeamSummary([]);

      let schema = await getActiveSchema().then((schema) => schema.name);
      let teams = await listTeams(schema);
      setTeams(teams);

      for (const team of teams) {
        let summarized = await getCachedTeamAISummarize(
          team,
          schema
        );

        if (summarized) {
          setAllTeamSummary((prev) => [
            ...prev,
            { team: team, summary: summarized },
          ]);
        }
      }
    };

    loadCachedData();
  }, []);

  return (
    <div className="admin">
      <div className="container mt-4">
        <Group name="AI Summarization">
          <div className="row">
            <div className="col-md-6">
              <Form.Control
                type="text"
                placeholder="Team"
                onChange={(e) => setTeam(e.target.value)}
                disabled={isLoading}
              />
              {isLoading ? (
                <>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      style={{ width: `${allTeamProgress}%` }}
                      aria-valuenow={allTeamProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {allTeamProgress.toFixed(2)}%
                    </div>
                  </div>
                  <Button variant="danger" onClick={() => stopLoop()}>
                    Stop
                  </Button>
                </>
              ) : (
                <>
                  <ButtonFull
                    name="Summarize"
                    callback={() => {
                      setIsLoading(true);
                      start_summarize().finally(() => setIsLoading(false));
                    }}
                    disabled={isLoading}
                  />
                  <ButtonFull
                    name={"Summarize All" + (lastLoadedPosition === -1 ? "" : ` (${lastLoadedPosition + 1} - ${teams.length})`)}
                    callback={() => {
                      setIsLoading(true);
                      start_summarize_all().finally(() => setIsLoading(false));
                    }}
                    disabled={isLoading}
                  />
                  <ButtonFull
                    name="Back to Admin"
                    callback={() => navigate("/admin")}
                    disabled={isLoading}
                  />
                </>
              )}
            </div>
            <div className="col-md-6">
              {teleop === "" ? null : (
                <Group name="Summary">
                  <h4>Autonomous Period</h4>
                  <p>{autos}</p>
                  <h4>Teleop Period</h4>
                  <p>{teleop}</p>
                  <h4>Defense</h4>
                  <p>{defense}</p>
                  <h4>Endgame</h4>
                  <p>{endgame}</p>
                  <h4>Overall Rating</h4>
                  <div className="progress">
                    <div
                      className={`progress-bar ${
                        ranking >= 7
                          ? "bg-success"
                          : ranking < 4
                          ? "bg-danger"
                          : ""
                      }`}
                      role="progressbar"
                      style={{ width: `${(ranking / 10) * 100}%` }}
                      aria-valuenow={ranking}
                      aria-valuemin="0"
                      aria-valuemax="10"
                    >
                      {ranking}/10
                    </div>
                  </div>
                  <h4>Reasoning</h4>
                  <p>{reasoning}</p>
                </Group>
              )}
            </div>
          </div>
        </Group>
      </div>

      {allTeamSummary.length === 0 ? null : (
        <div className="container" style={{ width: "100%" }}>
          <Group name="All Team Summary" style={{ width: "100%" }}>
            <div style={{ display: "flex", width: "100%" }}>
              <Button
                name="Export CSV"
                onClick={exportToCSV}
                style={{ marginRight: "1rem", width: "20%" }}
                disabled={isLoading}
              >
                Export
              </Button>
              <Form.Control
                type="text"
                placeholder="Search"
                style={{ marginLeft: "1rem" }}
                onChange={(e) => {
                  setSearch(e.target.value.trim().toLowerCase());
                }}
                disabled={isLoading}
              />
            </div>
            {allTeamSummary
              .filter((team) => team.team.toLowerCase().includes(search))
              .sort(
                (a, b) => b.summary.overall_rating - a.summary.overall_rating
              )
              .map((team) => (
                <div
                  key={team.team}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "5px",
                  }}
                >
                  <h4>Team {team.team}</h4>
                  <h4>Autonomous Period</h4>
                  <p>{team.summary.autonomous_period}</p>
                  <h4>Teleop Period</h4>
                  <p>{team.summary.teleop_period}</p>
                  <h4>Defense</h4>
                  <p>{team.summary.defense}</p>
                  <h4>Endgame</h4>
                  <p>{team.summary.endgame}</p>
                  <h4>Overall Rating</h4>
                  <div className="progress">
                    <div
                      className={`progress-bar ${
                        team.summary.overall_rating >= 7
                          ? "bg-success"
                          : team.summary.overall_rating < 4
                          ? "bg-danger"
                          : ""
                      }`}
                      role="progressbar"
                      style={{
                        width: `${(team.summary.overall_rating / 10) * 100}%`,
                      }}
                      aria-valuenow={team.summary.overall_rating}
                      aria-valuemin="0"
                      aria-valuemax="10"
                    >
                      {team.summary.overall_rating}/10
                    </div>
                  </div>
                  <h4>Reasoning</h4>
                  <p>{team.summary.reasoning}</p>
                </div>
              ))}
          </Group>
        </div>
      )}
    </div>
  );
};

const checkAdmin = (user) => {
  return user.email.split("@")[0] === "admin" || user.email.split("@")[0] === "lead";
};

export default AISummarization;
