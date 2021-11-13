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

import books from "./assets/dummy/books";
import mybooks from "./assets/dummy/mybooks";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [myBooks, setMyBooks] = useState(mybooks);
  const [searchResult, setSearchResult] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isNotify, setIsNotify] = useState(false);
  const [notify, setNotify] = useState("");

  const getBookmark = async () => {
    const rack = await axios.get("/mypage/rack");
    const shelf = await axios.get("/mypage/shelf");
    try {
      setMyBooks({ rack: rack.books, shelf: shelf.books });
      setIsLogin(true);
    } catch {
      // setMyBooks({});
      setIsLogin(false);
    }
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
                setSearchKeyword={setSearchKeyword}
                setSearchResult={setSearchResult}
                searchKeyword={searchKeyword}
                myBooks={myBooks}
                books={books}
              />
            }
          />
          <Route path="/mypage" element={<Redirect />} />
          <Route
            path="/search"
            element={
              <Search
                searchResult={searchResult}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
              />
            }
          />
          <Route path="/login" element={<LogIn setIsLogin={setIsLogin} />} />
          <Route
            path="/signup"
            element={<SignUp setIsNotify={setIsNotify} setNotify={setNotify} />}
          />
          <Route path="/edit-password" element={<EditPassword />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
