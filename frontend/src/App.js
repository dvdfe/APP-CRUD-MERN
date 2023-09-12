import Routes from "./components/Routes/index";
import { Provider, useDispatch } from "react-redux";
import store from "./app/store";
import { useEffect } from "react";
import axios from "axios";
import { setUsersData } from "./feature/usersSlice";
import { useState } from "react";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/login")
      .then((res) => dispatch(setUsersData(res.data)));
  }, [uid]);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
