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
  const [searchResult, setSearchResult] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

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
                setSearchKeyword={setSearchKeyword}
                setSearchResult={setSearchResult}
                searchKeyword={searchKeyword}
              />
            }
          />
          <Route path="/mypage" element={<MyPage />} />
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
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit-password" element={<EditPassword />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
