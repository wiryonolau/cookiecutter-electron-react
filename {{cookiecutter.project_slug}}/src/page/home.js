
import { useState } from "react";
import { useQuery } from "../hooks";

export const HomePage = function (props) {
    let [config, setConfig] = useState({});

    // useQuery cannot be use inside useEffect
    let query = useQuery();

    React.useEffect(() => {
        window.api.on("fromMain", (data) => {
            setConfig(data);
        });

        window.api.send("toMain", {
            method: "getConfig",
        });
    }, []);

    let renderData = (() => {
        if (config.data === undefined) {
            return null;
        }

        return config.data.map((k, i) => {
            return <div key={i}>{k.name}</div>;
        });
    })();

    return (
        <div>
            <div>Welcome to App</div>
            <div>Query : {query.toString()}</div>
            {renderData}
        </div>
    );
};