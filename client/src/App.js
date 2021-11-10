import { Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import EditPassword from "./pages/EditPassword";
import LogIn from "./pages/LogIn";
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
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/mypage">
          {isLogin ? <MyPage myBooks={myBooks} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/login">
          <LogIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/edit-password">
          <EditPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
