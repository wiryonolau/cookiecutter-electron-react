import { Routes, Route } from "react-router-dom";
import { HomePage, UserPage } from "./page";

export const AppRouter = function (props) {
    return (
        <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
        </Routes>
    );
};
