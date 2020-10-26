import * as firebase from "firebase";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";

import { firebaseConfig } from "./config";
import { uriToBlob } from "./uriToBlob";

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
const store = app.firestore();
const storage = app.storage();

export { app, db, store, storage };
