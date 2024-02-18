// Helper function to send and fetch base on given channel
// Server only receive single channel "toMain"
// and return to given channel by client
export const ipcFetch = function (channel, params, callback) {
    window.api.once(channel, (data) => {
        if (callback) {
            try {
                callback(data);
            } catch (err) {
                console.log(err.message);
            }
        }
    });

    params["method"] = channel;
    window.api.send("toMain", params);
};
