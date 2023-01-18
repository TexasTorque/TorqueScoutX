import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const Toggle = ({ name, callback, init, on, off, id }) => {
  const [value, setValue] = useState(init ?? false);

  const update = () => {
    const n = !value;
    setValue(n);
    callback(n);
  };

  const getWidgetState = () => {
    return {
      value: value,
      name: name,
    };
  };

  return (
    <div className="toggle">
      <div className="row mt-4 mr-3">
        <h4 className="name-field ml-3 mt-2" style={{ width: "8rem" }}>
          {name || <Null />}
        </h4>
        <div className="ml-0 mt-1" style={{ width: "10rem" }}>
          <Button
            className="w-100"
            variant={value ? on ?? "success" : off ?? "danger"}
            size="md"
            onClick={() => update()}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ToggleWidget = {
  schemaFields: ["name", "init"],
  schemaFieldsTypes: ["s", false],

  widget: (props) => {
    return <Toggle {...props} />;
  }
};

export default Toggle;