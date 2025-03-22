import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const MutuallyExclusive = ({ name, elements, callback, widgetCallback, pointsMap, alias }) => {

  if (pointsMap) {
    elements = pointsMap.map((e) => {
      return Object.keys(e)[0];
    });
  }
  const [selected, setSelected] = useState(Object.keys(pointsMap[0])[0]);

  const update = (element) => {
    setSelected(element);
    callback && callback(element);
  };

  useEffect(() => {
    let points = 0;
    for (let i = 0; i < pointsMap.length; i++) {
      if (Object.keys(pointsMap[i])[0] === selected) {
        points = Object.values(pointsMap[i])[0];
      }
    }
    if (widgetCallback) {
      widgetCallback({ name: name, value: selected, points: points });
    }
  }, [selected, name, pointsMap, widgetCallback]);

  return (
    <div>
      <hr style={{ borderTop: "5px solid light gray" }} />
      {name && <h2 style={{ fontSize: "1.5rem" }}>{alias ?? name}</h2>}
      <hr style={{ borderTop: "5px solid light gray" }} />

      {/* <Subgroup name={name} alias={alias} points={}/>; */}

      {elements.map((element) => (
        <div className="MutuallyExclusive">
          <div className="row mt-0 ml-0">
            <h4 className="name-field ml-0" style={{ width: "8rem", fontSize: "1.3rem", marginTop: "0.90rem" }}>
              {element || <Null />}
            </h4>
            <div className="ml-0 mt-0" style={{ width: "10rem" }}>
              <Button
                className="w-100"
                variant={selected === element ? "success" : "danger"}
                size="md"
                onClick={() => update(element)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const MutuallyExclusiveWidget = {
  schemaFields: ["name", "pointsMap"],
  schemaFieldsTypes: ["s", { "K": "v" }],
  widget: (props, widgetCallback) => {
    return <MutuallyExclusive {...props} />;
  },
};

export default MutuallyExclusive;
