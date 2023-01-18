import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const MutuallyExclusive = ({ elements, callback }) => {
  const [selected, setSelected] = useState(elements[0]);

  const update = (element) => {
    setSelected(element);
    callback(element);
  };

  return (
    <div>
      {elements.map((name, i) => (
        <div className="MutuallyExclusive">
          <div className="row mt-4 mr-3">
            <h4 className="name-field ml-3 mt-2" style={{ width: "8rem" }}>
              {name || <Null />}
            </h4>
            <div className="ml-0 mt-1" style={{ width: "10rem" }}>
              <Button
                className="w-100"
                variant={selected === name ? "success" : "danger"}
                size="md"
                onClick={() => update(name)}
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
  widget: (props) => {
    return <MutuallyExclusive {...props} />;
  }
};

export default MutuallyExclusive;
