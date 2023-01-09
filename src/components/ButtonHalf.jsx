import React from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const ButtonHalf = ({ name, callback, variant }) => {
  return (
    <div className="click">
      <div className="row mt-4 mr-3">
        <h4 className="name-field ml-3 mt-2" style={{ width: "8rem" }}>
          {name || <Null />}
        </h4>
        <div className="ml-0 mt-1" style={{ width: "10rem" }}>
          <Button
            className="w-100"
            variant={variant ?? "primary"}
            size="md"
            onClick={() => callback()}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonHalf;
