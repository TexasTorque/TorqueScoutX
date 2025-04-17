import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import Null from "./Null";

const Numeric = ({
  name,
  callback,
  min,
  max,
  init,
  increment,
  widgetCallback,
  multiplier,
  alias,
}) => {
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
  }, [count, name, widgetCallback, multiplier]);

  return (
    <div className="numeric">
      <div className="row align-items-center" style={{ margin: 0 }}>
        <Col className="pl-1 pr-1">
          <h4
            className="name-field"
            style={{ fontSize: "1.1rem", margin: 0 }}
          >
            {(alias ?? name) || <Null />}
          </h4>
        </Col>
        <Col className="pl-1 pr-1" style={{ maxWidth: "60px" }}>
          <Button variant="danger" size="lg" onClick={() => update(-1)} style={{ padding: "0.2rem 0.5rem", scale: "1.2" }}>
            -
          </Button>
        </Col>
        <Col className="pl-1 pr-1" style={{ maxWidth: "60px" }}>
          <h4 className="mono-field" style={{ margin: 0, fontSize: "1.6rem" }}>
            {count}
          </h4>
        </Col>
        <Col className="pl-1 pr-1" style={{ maxWidth: "60px" }}>
          <Button variant="success" size="lg" onClick={() => update(1)} style={{ padding: "0.2rem 0.5rem", scale: "1.2" }}>
            +
          </Button>
        </Col>
      </div>
    </div>
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
