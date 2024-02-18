import { AppRouter } from "./router";
import { Navigation } from "./component/navigation";
import "bulma/css/bulma.min.css";

export const App = function (props) {
    return (
        <>
            <Navigation />
            <AppRouter />
        </>
    );
};
