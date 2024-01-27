import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import auth from "../firebase/firebase.init";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();
const inititalState = {
  user: null,
  role: null,
  error: "",
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "LOADED":
      return {
        ...state,
        loading: false,
      };
    case "SUCCESS":
      return {
        ...state,
        user: action.user,
        role: action.role,
        loading: false,
        error: "",
      };
    case "FAILURE":
      return {
        ...state,
        user: null,
        role: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [authInfo, dispatchAuth] = useReducer(reducer, inititalState);

  const createUser = (email, password) => {
    dispatchAuth({ type: "LOADING" });
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatchAuth({ type: "LOADING" });
      if (user) {
        axiosPublic(`/user-role?email=${user?.email}`).then((res) => {
          dispatchAuth({
            type: "SUCCESS",
            user,
            role: res.data.role,
          });
          axiosPublic
            .post("/jwt", { email: user.email, role: res.data.role })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
            });
        });
      } else {
        dispatchAuth({
          type: "SUCCESS",
          user: null,
          role: null,
        });
        localStorage.removeItem("token");
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  return (
    <AuthContext.Provider
      value={{
        ...authInfo,
        auth,
        dispatchAuth,
        createUser,
        loginUser,
        googleLogin,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
