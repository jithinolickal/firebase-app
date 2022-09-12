import { onSnapshot, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import AccountDataService from "./services/account.services";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [btnClickedFlag, setBtnClickedFlag] = useState(false); // HACK temp flag to referesh data
  // useEffect(() => { // HACK
  //   onSnapshot(collection(db, "accounts"), (snapshot) => {
  //     setAccounts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   });
  // }, [btnClickedFlag]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const data = await AccountDataService.getAllAccounts();
    console.log(data.docs);
    setAccounts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addNewAccount = async () => {
    try {
      const data = await AccountDataService.addAccounts({
        account_id: 222,
        account_name: "testNew",
        owner: "new_owner",
      });
      console.log(data);
      // setBtnClickedFlag(!btnClickedFlag); // HACK
      getAccounts(); // Refresh data
    } catch (error) {
      console.log("Error -- ", error);
    }
  };
  
  const deleteOneAccount = async (id) => {
    try {
      const data = await AccountDataService.deleteAccount(id);
      console.log(data);
      getAccounts(); // Refresh data
    } catch (error) {
      console.log("Error -- ", error);
    }
  };
  console.log("accounts", accounts);
  return (
    <div className="App">
      <u>ITEMS</u>
      <button onClick={addNewAccount}>Add</button>
      {accounts.length > 0 &&
        accounts.map((item) => (
          <div key={item.id}>
            <div>ID: {item.id}</div>
            <div>Account ID: {item.account_id}</div>
            <div>Account Name: {item.account_name}</div>
            <div>Account Owner: {item.owner}</div>
            <button onClick={(e)=>deleteOneAccount(item.id)}>Delete</button>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default App;
