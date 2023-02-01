import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import Null from "./Null";

const Numeric = ({ name, callback, min, max, init, increment, widgetCallback, multiplier, alias }) => {


  const [count, setCount] = useState(init || 0);

  !multiplier && (multiplier = 1);

  const update = (direction) => {
    const n = Math.min(
      Math.max(count + direction * (increment ?? 1), min ?? 0),
      max ?? 99
    );
    setCount(n);
    callback && callback(n);
  };

  useEffect(() => {
    if (widgetCallback) {
      widgetCallback({ name: name, value: count, points: count * multiplier });
    }
  }, [count]);

  return (
    <div className="numeric">
      <div className="row mt-4 mr-1">
        <Col className="ml-0 mt-2">
          <h4 className="name-field" style={{ fontSize: "1.3rem" }}>{(alias ?? name) || <Null />}</h4>
        </Col>
        <Col className="ml-0 mt-1">
          <Button variant="danger" size="md" onClick={() => update(-1)}>
            -
          </Button>
        </Col>
        <Col className="ml-0 mt-2">
          <h4 className="mono-field">{count}</h4>
        </Col>
        <Col className="ml-0 mt-1">
          <Button variant="success" size="md" onClick={() => update(1)}>
            +
          </Button>
        </Col>
      </div>
    </div >
  );
};

export const NumericWidget = {
  schemaFields: ["name", "multiplier"],
  schemaFieldsTypes: ["s", 1],
  widget: (props, widgetCallback) => {
    return <Numeric {...{ widgetCallback, ...props }} />;
  },
};

export default Numeric;
