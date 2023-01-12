// import React, { useEffect } from "react";

// import { getAuth, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from "../../firebase";
// import { admin } from "../../firebase";


// import Group from "../../components/Group";
// import ButtonFull from "../../components/ButtonFull";

// // const createUser = async (email, password) => {
// //     const auth = getAuth();

// //     await createUserWithEmailAndPassword(
// //         auth,
// //         email,
// //         password
// //     ).catch((e) => {
// //         alert(e);
// //     }).then(() => { alert("User created successfully"); });
// // };

// // const getUserList = async () => {

// // };

// const ManageUsers = () => {

//     const navigate = useNavigate();
//     const [user, loading, error] = useAuthState(auth);

//     useEffect(() => {
//         if (!user) return navigate("/login");
//         if (!(checkAdmin(user))) return navigate("/dashboard");
//     }, [user, loading]);

//     let users = [];

//     admin.auth().listUsers(1000).then((listUsersResult) => {
//         console.log(listUsersResult);
//     });

//     useEffect(() => { }, [users]);

//     return (
//         <div className="manageusers">
//             <Group name="Users">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((item, key) => {
//                             return (
//                                 <tr key={key}>
//                                     <td>{item.email.split("@")[0]}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </Group>
//             {/* <Group name="Create User">
//                 <ButtonFull name="Add Users"></ButtonFull>
//             </Group> */}
//         </div>
//     );
// };

// const checkAdmin = (user) => {
//     return user.email.split("@")[0] === "admin";
// };

// export default ManageUsers;