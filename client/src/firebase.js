import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc, setDoc, getDoc, updateDoc, arrayUnion, getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9au8HLI9Fna7cWqnTr-5TUSMMwMF3HQE",
  authDomain: "torquescoutx.firebaseapp.com",
  projectId: "torquescoutx",
  storageBucket: "torquescoutx.appspot.com",
  messagingSenderId: "1094938071653",
  appId: "1:1094938071653:web:37f374cec3196076982c8c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert("Wrong Password");
  }
};

export const logout = () => {
  signOut(auth);
};

export const getUserFromID = async (id) => {
  const user = await getDoc(doc(db, "users", id));
  return user.data() ?? null;
};

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user.uid;
  } catch (err) {
    alert(err.message);
    return null;
  }
};

export const createUser = async (first, last, password, admin) => {
  const id = (last.substring(0, 5) + first.substring(0, 3)).toLowerCase();
  const email = id + "@torquescout.com";
  const uid = registerWithEmailAndPassword(email, password);
  setDoc(doc(db, "users", id), {
    id: id,
    admin: admin,
    first: first,
    last: last,
    email: email,
  });
};

export const deleteUserByName = async (first, last) => deleteUserByID(last.substring(0, 5) + first.substring(0, 3));

export const deleteUserByID = async (id) => {
  alert("Deleting users from admin not yet implemented.");
};

const getSchemaDoc = async () => {
  return await getDoc(doc(db, "schemas", "schema"));
};

export const pushSchema = async (schema, schemaName) => {
  let schemaDoc = (await getSchemaDoc()).data();
  schemaDoc.storedSchemas.push({ schema: schema, name: schemaName });
  setDoc(doc(db, "schemas", "schema"), schemaDoc);
  alert(schemaName + " schema pushed to database.");
};

export const getStoredSchemas = async () => {
  let schemaDoc = (await getSchemaDoc()).data();
  return schemaDoc.storedSchemas.map((schema) => schema.name);
};

export const setActiveSchema = async (schemaName) => {
  let schemaDoc = (await getSchemaDoc()).data();
  let requestedSchema = schemaDoc.storedSchemas.find((schema) => schema.name === schemaName);
  schemaDoc.activeSchema = requestedSchema;
  setDoc(doc(db, "schemas", "schema"), schemaDoc);
  alert(schemaName + " schema set as active.");
};

export const getSchemaByName = async (schemaName) => {
  let schemaDoc = (await getSchemaDoc()).data();
  let requestedSchema = schemaDoc.storedSchemas.find((schema) => schema.name === schemaName);
  return requestedSchema.schema;
};

export const getActiveSchema = async () => {
  let schemaDoc = (await getSchemaDoc()).data();
  return schemaDoc.activeSchema;
};

export const pushReport = async (report) => {
  let active = await getActiveSchema();
  const col = collection(db, active.name);
  const docRef = doc(col, report.Team);
  if ((await getDoc(docRef)).exists()) {
    await updateDoc(docRef, { reports: arrayUnion(report) });
  } else {
    await setDoc(docRef, { reports: [report] });
  }
  alert("Report pushed to database.");
};

const getAnalysisSchemaDoc = async () => {
  return await getDoc(doc(db, "schemas", "analysisSchema"));
};

export const doesSchemaExist = async (schemaName) => {
  let schemaDoc = (await getSchemaDoc()).data();
  return schemaDoc.storedSchemas.some((schema) => schema.name === schemaName);
};

export const pushAnalysisSchema = async (schema, schemaName) => {
  let schemaDoc = (await getAnalysisSchemaDoc()).data();
  schemaDoc.storedSchemas.push({ schema: schema, name: schemaName });
  setDoc(doc(db, "schemas", "analysisSchema"), schemaDoc);
  alert(schemaName + " analysis schema pushed to database.");
};

export const getStoredAnalysisSchemas = async () => {
  let schemaDoc = (await getAnalysisSchemaDoc()).data();
  return schemaDoc.storedSchemas.map((schema) => schema.name);
};

export const setActiveAnalysisSchema = async (schemaName) => {
  let schemaDoc = (await getAnalysisSchemaDoc()).data();
  let requestedSchema = schemaDoc.storedSchemas.find((schema) => schema.name === schemaName);
  schemaDoc.activeSchema = requestedSchema;
  setDoc(doc(db, "schemas", "analysisSchema"), schemaDoc);
  alert(schemaName + " analysis schema set as active.");
};

export const getAnalysisSchemaByName = async (schemaName) => {
  let schemaDoc = (await getAnalysisSchemaDoc()).data();
  let requestedSchema = schemaDoc.storedSchemas.find((schema) => schema.name === schemaName);
  return requestedSchema.schema;
};

export const getActiveAnalysisSchema = async () => {
  let schemaDoc = (await getAnalysisSchemaDoc()).data();
  return schemaDoc.activeSchema;
};

export const getMatchesPerTeam = async (team) => {
  let active = await getActiveSchema();
  const col = collection(db, active.name);
  const docRef = doc(col, team);
  if ((await getDoc(docRef)).exists()) {
    return (await getDoc(docRef)).data().reports;
  } else {
    alert("Team not found in database.");
  }
};

export const getTeamReports = async (schema = null) => {
  const active = schema ? schema : (await getActiveSchema()).name;
  const col = collection(db, active);
  const querySnapshot = await getDocs(col);
  const documents = [];
  querySnapshot.forEach(doc => {
    const document = { [doc.id]: doc.data() };
    documents.push(document);
  });
  return documents;
}

