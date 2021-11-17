import { Route, Routes } from "react-router-dom";
import EditPassword from "./pages/EditPassword";
import LogIn from "./pages/LogIn";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import NotificationCenter from "./components/NotificationCenter";
import "./App.css";

require("dotenv").config();

function App() {
  return (
    <section className="app_section">
      <Header />
      <NotificationCenter />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/edit-password" element={<EditPassword />} />
      </Routes>
    </section>
  );
}

export default App;
