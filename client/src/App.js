import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginStateChange } from "./actions/index";
import axios from "axios";
import EditPassword from "./pages/EditPassword";
import LogIn from "./pages/LogIn";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import NotificationCenter from "./components/NotificationCenter";
import "./App.css";

// import mybooks from "./assets/dummy/mybooks";
require("dotenv").config();

function App() {
  const state = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const { isLogIn } = state;
  console.log(isLogIn);
  const [myBooks, setMyBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isNotify, setIsNotify] = useState(false);
  const [notify, setNotify] = useState("");

  const getBookmark = () => {
    axios
      .get(`${process.env_REACT_APP_API_URL}/mypage/mybooks`, {
        withCredentials: true,
      })
      .then((res) => {
        setMyBooks(res.data.books);
        dispatch(loginStateChange(true));
      });
    // .catch((err) => setIsLogin(false));
  };

  const Redirect = () => {
    return isLogIn ? <MyPage myBooks={myBooks} /> : <Navigate to="/" />;
  };

  useEffect(() => {
    getBookmark();
  }, []);

  useEffect(() => {
    if (isNotify) {
      setTimeout(() => setIsNotify(false), 3000);
    }
  }, [isNotify]);

  return (
    <>
      <Header />
      <section className="app_section">
        <NotificationCenter />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                setIsNotify={setIsNotify}
                setNotify={setNotify}
                setSearchKeyword={setSearchKeyword}
                setSearchResult={setSearchResult}
                searchKeyword={searchKeyword}
                myBooks={myBooks}
              />
            }
          />
          <Route path="/mypage" element={<Redirect />} />
          <Route
            path="/search"
            element={
              <Search
                setIsNotify={setIsNotify}
                setNotify={setNotify}
                searchResult={searchResult}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
              />
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/signup"
            element={<SignUp setIsNotify={setIsNotify} setNotify={setNotify} />}
          />
          <Route
            path="/edit-password"
            element={
              <EditPassword setIsNotify={setIsNotify} setNotify={setNotify} />
            }
          />
        </Routes>
      </section>
    </>
  );
}

export default App;
