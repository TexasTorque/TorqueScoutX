# TorqueScoutX

TorqueScoutX is Texas Torque's scouting application. With dynamic scouting page rendering, enhanced analysis, and easy user management features, it is the best scouting app in all of FIRST Robotics. It is the last scouting app that ever needs to be built due to its dynamic schema construction system, which makes it easy to construct scouting infrastructure for any FRC game.

## Schema Construction
The layout of the scouting page is specified in JSON format as widgets with mandatory and optional parameters. The widgets are shown below:

Parentheses indicate optional fields and denote default value.

**Toggle:** *A widget to toggle between true and false states.*

Name, Initial Value - false or true, Amount of Points for True (1), Amount of Points for False (0)

**Mutually Exclusive:** *A list of toggles in which only one can be true at a time, effectively a list of radio buttons.*

Name, Elements - an array of of values for the buttons, Points Map - a dictionary of element-point pairs and elements must be passed in the same order as the elements array 

**Numeric:** *A counter with an incrementer and decrementer.*

Name, Min (0), Max (99), Initial Value (0), Increment (1), Points Multiplier (1)

**Stopwatch:** *A stopwatch with timer functionality in seconds.*

Name

**Dropdown:** *A dropdown, similar to mutually exclusive.*

Name, Prompt ("Select an option"), Points Map - a dictionary of element-point pairs and note this is the only place to specify elements as there is no elements array

**Label:** *A text field input.*

Name

**Group:** *A meta-widget which groups together widgets that need to be placed together, think Auto and Teleop being in seprate Groups.*

Name, Manual Children - an array of widget objects

## Authored by [Suhas Guddeti](https://github.com/Suhas44/) and [Jacob Daniels](https://github.com/firebanner64)