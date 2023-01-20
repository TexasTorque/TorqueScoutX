import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const MutuallyExclusive = ({ name, elements, callback, widgetCallback }) => {
  const [selected, setSelected] = useState(elements[0]);

  const update = (element) => {
    setSelected(element);
    callback && callback(element);
  };

  useEffect(() => {
    if (widgetCallback) {
      widgetCallback({ name: name, value: selected, });
    }
  }, [selected]);

  return (
    <div>
      {name && <h2 >{name}</h2>}
      {elements.map((element, i) => (
        <div className="MutuallyExclusive">
          <div className="row mt-4 mr-3">
            <h4 className="name-field ml-3 mt-2" style={{ width: "8rem" }}>
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
  schemaFields: ["name", "elements"],
  schemaFieldsTypes: ["s", [1]],
  widget: (props, widgetCallback) => {
    return <MutuallyExclusive {...{ widgetCallback, ...props }} />;
  },
};

export default MutuallyExclusive;
