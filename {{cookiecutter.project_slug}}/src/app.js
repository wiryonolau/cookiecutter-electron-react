import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./page";

const Navigation = function(props) {
  return(
    <NavLink to="/" />
  );
}

const AppRouter = function (props) {
    return (
        <Routes>
            <Route path="/" exact element={<HomePage />} />
        </Routes>
    );
};

export const App = function (props) {
    return (
        <>
          <Navigation />
          <AppRouter />
        </>
    );
};
