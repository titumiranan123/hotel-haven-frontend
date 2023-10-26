import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "./redux/authSlice";
import axios from "axios";

const App = ({children}) => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const isUser = localStorage.getItem("user");
    if (isUser) {
      dispatch(setUser({user: JSON.parse(isUser)}));
      return setIsAppLoading(false);
    }

    const bearer = `Bearer ${token}`;
    if (token) {
      setIsAppLoading(true);
      axios
        .get("user", {
          headers: {
            Authorization: bearer,
          },
        })
        .then(({data}) => {
          dispatch(setUser({user: data}));
          setIsAppLoading(false);
        })
        .catch((err) => setIsAppLoading(false));
      return;
    }

    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   const parsedUser = JSON.parse(JSON.stringify(user));
    //   if (user) {
    //     dispatch(login({user: parsedUser, token: user.uid}));
    //   } else {
    //     dispatch(logout());
    //     signOut(auth)
    //       .then()
    //       .catch((err) => dispatch(setError(err.message)));
    //   }
    //   setIsAppLoading(false);
    // });
    // return () => unsubscribe();
  }, [token]);

  return <>{isAppLoading ? "Loading..." : children}</>;
};

export default App;
