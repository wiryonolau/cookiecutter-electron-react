import { NavLink } from "react-router-dom";

export const Navigation = function (props) {
    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/user">User</NavLink>
            </li>
        </ul>
    );
};
