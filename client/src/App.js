import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EditPassword from "./pages/EditPassword";
import LogIn from "./pages/LogIn";
import axios from "axios";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

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

  useEffect(() => {
    getBookmark();
  }, []);

  const Redirect = () => {
    return isLogin ? <MyPage myBooks={myBooks} /> : <Navigate to="/" />;
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/mypage" element={<Redirect />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/edit-password" element={<EditPassword />} />
      </Routes>
    </div>
  );
}

export default App;
