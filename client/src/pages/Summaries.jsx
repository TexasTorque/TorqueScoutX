import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Group from "../components/Group";
import { useEffect } from "react";
import {
  getActiveSchema,
  getCachedTeamAISummarize,
  listTeams,
} from "../firebase";
import ButtonFull from "../components/ButtonFull";

const Summaries = () => {
  const [allTeamSummary, setAllTeamSummary] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Load all cached data
    const loadCachedData = async () => {
      setAllTeamSummary([]);

      let schema = await getActiveSchema().then((schema) => schema.name);
      let teams = await listTeams(schema);

      for (const team of teams) {
        let summarized = await getCachedTeamAISummarize(team, schema);

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
    <div>
      <ButtonFull name="Back to Home" callback={() => window.history.back()} />

      {allTeamSummary.length === 0 ? (
        <div className="container" style={{ width: "100%" }}>
          <Group name="All Team Summary" style={{ width: "100%" }}>
            <h4>No data available</h4>
            <p>Likely the admins have not yet summarized the data</p>
          </Group>
        </div>
      ) : (
        <div className="container" style={{ width: "100%" }}>
          <Group name="All Team Summary" style={{ width: "100%" }}>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Control
                type="text"
                placeholder="Search"
                style={{ marginLeft: "1rem" }}
                onChange={(e) => {
                  setSearch(e.target.value.trim().toLowerCase());
                }}
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

export default Summaries;
