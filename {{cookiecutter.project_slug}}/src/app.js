import { AppRouter } from "./router";
import { Navigation } from "./component/navigation";

export const App = function (props) {
    return (
        <>
            <Navigation />
            <AppRouter />
        </>
    );
};
