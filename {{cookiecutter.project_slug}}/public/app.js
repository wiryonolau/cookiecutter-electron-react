import React from "react";

const App = function(props) {
  let [config, setConfig] = React.useState({});

  React.useEffect(() => {
    window.api.on("fromMain", ((data) => {
      setConfig(data);
    }));

    window.api.send("toMain", {
      method: "getConfig"
    })
  }, []);

  let renderData = (() => {
    if (config.data === undefined) {
      return null;
    }

    return config.data.map((k, i) => {
      return (
        <div key={i}>{k.name}</div>
      );
    });
  })();

  return (
    <div>
      <div>Welcome to App</div>
      {renderData}
    </div>
  );
}

module.exports = {
  App
}
