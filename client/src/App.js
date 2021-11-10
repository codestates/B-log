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
import Button from "./components/Button";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [myBooks, setMyBooks] = useState({ rack: [], shelf: [] });

  const getBookmark = async () => {
    const rack = await axios.get("/mypage/rack");
    const shelf = await axios.get("/mypage/shelf");
    try {
      setMyBooks({ rack: rack.books, shelf: shelf.books });
      setIsLogin(true);
    } catch {
      setMyBooks([]);
      setIsLogin(false);
    }
  };

  const Redirect = () => {
    return isLogin ? <MyPage myBooks={myBooks} /> : <Navigate to="/" />;
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <div>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Button message="비밀번호 변경" color="dark" />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Redirect />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/edit-password" element={<EditPassword />} />
      </Routes>
    </div>
  );
}

export default App;
