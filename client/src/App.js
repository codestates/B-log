import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EditPassword from "./pages/EditPassword";
import LogIn from "./pages/LogIn";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Notification from "./components/Notification";
import "./App.css";

// import mybooks from "./assets/dummy/mybooks";
require("dotenv").config();

function App() {
  const [isLogin, setIsLogin] = useState(false);
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
        setIsLogin(true);
      })
      .catch((err) => setIsLogin(false));
  };

  const Redirect = () => {
    return isLogin ? <MyPage myBooks={myBooks} /> : <Navigate to="/" />;
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
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <section className="app_section">
        {isNotify ? <Notification message={notify} time={3000} /> : null}
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
          <Route
            path="/login"
            element={
              <LogIn
                setIsNotify={setIsNotify}
                setNotify={setNotify}
                setIsLogin={setIsLogin}
              />
            }
          />
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
