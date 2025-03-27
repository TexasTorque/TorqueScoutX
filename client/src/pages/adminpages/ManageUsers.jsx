import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import axios from "axios";

import Group from "../../components/Group";
import Button from "../../components/ButtonFull";

import TextField from "../../components/TextField";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [CUEmail, setCUEmail] = useState("");
  const [CUPW, setCUPW] = useState("");
  const [viewedUser, setViewedUser] = useState({});

  useEffect(() => {
    if (!user) return navigate("/login");
    if (!checkAdmin(user)) return navigate("/dashboard");
  }, [user, loading, navigate]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get("http://tsbackend.onrender.com/listUsers").then((res) => {
      setUsers(res.data.users);
    });
  };

  useEffect(() => {}, [users]);

  const handleCreateUser = () => {
    const json = JSON.stringify({
      email: CUEmail,
      password: CUPW,
    });

    axios
      .post("http://tsbackend.onrender.com/createUser", json, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(() => {
        getUsers();
      });
  };

  const handleDeleteUser = () => {
    const json = JSON.stringify({
      uid: viewedUser.uid,
    });

    axios
      .post("http://tsbackend.onrender.com/deleteUser", json, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(() => {
        getUsers();
      });
  };

  useEffect(() => {}, [viewedUser]);

  return (
    <div className="manageusers parent inline-block-child">
      <style>
        {`
                    .inline-block-child {
                        dislplay: grid;
                        grid-template-columns: 1fr 1fr;

                    }
                `}
      </style>

      <div className="child">
        <Group name="Users">
          <table>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, key) => {
                return (
                  <tr key={key}>
                    {key + 1 + " "}
                    <Link>
                      <span
                        onClick={() => {
                          setViewedUser(item);
                        }}
                      >
                        <td>{item.email}</td>
                      </span>
                    </Link>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Group>
      </div>

      <div className="child">
        <Group name="User Info">
          {"Email: " + (viewedUser.email ?? "No user selected")}
          <Button
            name="Delete User"
            callback={() => {
              handleDeleteUser();
            }}
          ></Button>
        </Group>
      </div>

      <Button name="bruh" callback={handleCreateUser}></Button>
      <TextField
        name="username"
        callback={(email) => {
          setCUEmail(email + "@scout.texastorque.org");
        }}
      ></TextField>
      <TextField
        name="password"
        callback={(PW) => {
          setCUPW(PW);
        }}
      ></TextField>
    </div>
  );
};

const checkAdmin = (user) => {
  return user.email.split("@")[0] === "admin" || user.email.split("@")[0] === "lead";
};

export default ManageUsers;
