import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const Toggle = ({ name, callback, init, widgetCallback, pointsTrue, pointsFalse, colorTrue, colorFalse }) => {
  const [value, setValue] = useState(init ?? false);

  const update = () => {
    const n = !value;
    setValue(n);
  };

  useEffect(() => {
    if (widgetCallback) {
      widgetCallback({ name: name, value: value, points: value ? (pointsTrue ?? 0) : (pointsFalse ?? 0) });
    }
    callback && callback(value);
  }, [value]);

  return (


    <div className="toggle">
      <style>
        {`
      .btn-false${name} {
        background-color: ${(colorFalse != null) ? colorFalse : "rgb(220,53,69)"};
      }
      .btn-true${name} {
        background-color: ${(colorTrue != null) ? colorTrue : "rgb(40,167,69)"};
      }

      
      `}
      </style>
      <div className="row mt-4 mr-3 fontChanger">
        <h4 className="name-field ml-3 mt-2" style={{ width: "8rem", fontSize: "1.3rem" }}>
          {name || <Null />}
        </h4>
        <div className="ml-0 mt-1" style={{ width: "10rem" }}>
          <Button
            className="w-100"
            variant={value ? ("true" + name) : ("false" + name)}
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