import { default as BootstrapDropdown } from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import Null from './Null';

const Dropdown = ({ name, prompt, elements, callback, widgetCallback, pointsMap }) => {

    if (pointsMap) {
        elements = Object.keys(pointsMap);
    }

    const [selected, setSelected] = useState(prompt || "Select an option");

    const update = (element) => {
        setSelected(element);

        widgetCallback && widgetCallback({ name: name, value: element, points: pointsMap[element] });
        callback && callback(element);
    };

    useEffect(() => {
        if (widgetCallback) {
            widgetCallback({ name: name, value: selected, points: pointsMap[selected] }); // check dropdown!!
        }
    }, [selected]);

    return (
        <div className="toggle">
            <div className="row mt-4 mr-3">
                <h4 className="name-field ml-3 mt-2" style={{ width: "7rem" }}>
                    {name || <Null />}
                </h4>
                <div className="ml-0 mt-1" style={{ width: "5rem" }}>
                    <BootstrapDropdown name={name}>
                        <BootstrapDropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: (widgetCallback) ? "12rem" : "18rem" }}>
                            {selected}
                        </BootstrapDropdown.Toggle>
                        <BootstrapDropdown.Menu>
                            {elements.map((element) => (
                                <BootstrapDropdown.Item key={element} onClick={() => { update(element); }}> {element} </BootstrapDropdown.Item>
                            ))}
                        </BootstrapDropdown.Menu>
                    </BootstrapDropdown>
                </div>
            </div>
        </div>
    );
};

export const DropdownWidget = {
    schemaFields: ["name", "prompt", "pointsMap"],
    schemaFieldsTypes: ["s", "s", { "K": "v" }],
    widget: (props, widgetCallback) => {
        return <Dropdown {...{ widgetCallback, ...props }} />;
    },
};

export default Dropdown;