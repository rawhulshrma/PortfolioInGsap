import React, { useEffect } from "react";
import Main from "./Pages/Main";
import Loader from './Pages/Loader/Loader'
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadUser } from "./actions/user";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.login);
  const { loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="App">
        <Main/>
      </div>
    )
  );
}

export default App;
