import { useState, useEffect } from "react";
import { useQuery } from "../hooks";
import { ipcFetch } from "../util";

import React from "react";
import { Button } from "react-bulma-components";

export const HomePage = function (props) {
    let [config, setConfig] = useState({});

    // useQuery cannot be use inside useEffect
    let query = useQuery();

    useEffect(() => {
        ipcFetch("getConfig", {}, (resp) => {
            setConfig(resp);
        });
    }, []);

    return (
        <div>
            <div>Welcome to App</div>
            <div>Query : {query.toString()}</div>
            {config.data &&
                config.data.map((k, i) => <div key={i}>{k.name}</div>)}

            <Button color="primary">My New Bulma button</Button>
        </div>
    );
};
