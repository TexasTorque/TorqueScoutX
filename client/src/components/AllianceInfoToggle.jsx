import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const AllianceInfoToggle = ({ name, callback, init, widgetCallback, pointsTrue, pointsFalse, colorTrue, colorFalse }) => {
  const [value, setValue] = useState(init ?? false);

  const update = () => {
    const n = !value;
    setValue(n);
  };

  useEffect(() => {
    if (widgetCallback) {
      widgetCallback({ name: name, value: value, points: value ? (pointsTrue ?? 1) : (pointsFalse ?? 0) }); //should pointsTrue be 0 or 1?
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
      <div className="row mt-4 ml-0">
        <h4 className="name-field ml-0" style={{ width: "8rem", fontSize: "1.3rem", marginTop: "0.3rem" }}>
          {name || <Null />}
        </h4>
        <div className="ml-0 mt-0" style={{ width: "10rem" }}>
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

export default AllianceInfoToggle;