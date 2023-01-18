import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';

import Null from "./Null";

const Stopwatch = ({ name, callback }) => {
  let [elapsed, setElapsed] = useState(0);
  let [paused, setPaused] = useState(true);
  let [interval, setIntervalVariable] = useState(null);

  const rate = 0.1;

  const update = () => {
    if (paused)
      setIntervalVariable(
        setInterval(() => setElapsed((elapsed) => elapsed + rate), 1e3 * rate)
      );
    else clearInterval(interval);

    setPaused(!paused);
    callback(Math.round(elapsed));
  };

  const reset = () => {
    if (!paused) update();
    setElapsed(0);
    setPaused(true);
  };

  return (
    <div className="numeric">
      <div className="row mt-4 mr-1">
        <Col className="ml-0 mt-2">
          <h4 className="name-field">{name || <Null />}</h4>
        </Col>
        <Col className="ml-0 mt-1">
          <Button variant="success" size="md" onClick={() => update()}>
            {!paused ? (
              <PauseIcon fontSize="small" />
            ) : (
              <PlayArrowIcon fontSize="small" />
            )}
          </Button>
        </Col>
        <Col className="ml-0 mt-2">
          <h4 className="mono-field">
            {Math.floor(elapsed)}
          </h4>
        </Col>
        <Col className="ml-0 mt-1">
          <Button variant="danger" size="md" onClick={() => reset()}>
            <ReplayIcon fontSize="small" />
          </Button>
        </Col>
      </div>
    </div>
  );
};

export const StopwatchWidget = {
  schemaFields: ["name"],
  schemaFieldsTypes: ["s"],
  widget: (props) => {
    return <Stopwatch {...props} />;
  }
};

export default Stopwatch;
