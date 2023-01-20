import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const Toggle = ({ name, callback, init, widgetCallback, pointsTrue, pointsFalse }) => {
  const [value, setValue] = useState(init ?? false);
  const [variant, setVariant] = useState(init ? "success" : "danger");

  const update = () => {
    const n = !value;
    setValue(n);
    setVariant(value ? "danger" : "success");

    callback && callback(n);
  };

  useEffect(() => {
    if (widgetCallback) {
      widgetCallback({ name: name, value: value, });
    }
  }, [value]);


  return (
    <div className="toggle">
      <div className="row mt-4 mr-3">
        <h4 className="name-field ml-3 mt-2" style={{ width: "8rem" }}>
          {name || <Null />}
        </h4>
        <div className="ml-0 mt-1" style={{ width: "10rem" }}>
          <Button
            className="w-100"
            variant={variant}
            size="md"
            onClick={() => { update(); }}
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

  widget: (props, widgetCallback) => {
    return <Toggle {...{ widgetCallback, ...props }} />;
  },

};

export default Toggle;