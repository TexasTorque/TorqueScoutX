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
  }, [selected]);

  return (
    <div>
      {name && <h2 style={{ fontSize: "1.8rem" }}>{alias ?? name}</h2>}
      <hr style={{ borderTop: "5px solid light gray" }} />
      {elements.map((element) => (
        <div className="MutuallyExclusive">
          <div className="row mt-4 mr-3">
            <h4 className="name-field ml-3 mt-2" style={{ width: "8rem", fontSize: "1.3rem" }}>
              {element || <Null />}
            </h4>
            <div className="ml-0 mt-1" style={{ width: "10rem" }}>
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
    return <MutuallyExclusive {...{ widgetCallback, ...props }} />;
  },
};

export default MutuallyExclusive;
