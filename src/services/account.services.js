import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const accountCollectionRef = collection(db, "accounts");
class AccountDataService {
  addAccounts = (newAccount) => {
    return addDoc(accountCollectionRef, newAccount);
  };

  updateAccount = (id, updatedAccount) => {
    const accountDoc = doc(db, "accounts", id);
    return updateDoc(accountDoc, updatedAccount);
  };

  deleteAccount = (id) => {
    const accountDoc = doc(db, "accounts", id);
    return deleteDoc(accountDoc);
  };

  getAllAccounts = () => {
    return getDocs(accountCollectionRef);
  };

  getAccount = (id) => {
    const accountDoc = doc(db, "accounts", id);
    return getDoc(accountDoc);
  };
}

export default new AccountDataService();