import React from "react";
import Card from "react-bootstrap/Card";

const Group = ({ name, children }) => {
  return (
    <div className="row ml-2 mb-4">
      <Card>
        {name != null ? (
          <Card.Header>
            <h3>{name}</h3>
          </Card.Header>
        ) : (
          ""
        )}
        <div className="ml-4 mr-4 mb-4">{children}</div>
      </Card>
    </div>
  );
};

export default Group;
