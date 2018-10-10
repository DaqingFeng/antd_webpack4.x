
export default class featchClient {
    /**
     * POST
     * @param {地址} url 
     * @param {参数(可空)} data 
     * @param {请求头部信息(可空)} headers 
     */
    static POST = (url, data, headers) => {
        if (!url) {
            return;
        }
        let tempHeaders = { 'Content-Type': 'application/json' };
        let tempPostData = {};
        if (headers) {
            tempHeaders = Object.assign({}, headers);
        }
        if (data) {
            tempPostData = Object.assign({}, data);
        }
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: tempHeaders,
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(tempPostData), // body data type must match "Content-Type" header
        }).then(response => response.json()); // parses response to JSON
    };


    /**
     * GET
     * @param {地址} url 
     * @param {参数(可空)} params 
     * @param {请求头部信息(可空)} headers 
     */
    static GET = (url, params, headers) => {
        if (!url) {
            return;
        }
        let tempHeaders = { 'Content-Type': 'application/json' };
        if (headers) {
            tempHeaders = Object.assign({}, headers);
        }
        if (params) {
            let esc = encodeURIComponent
            let query = Object.keys(params)
                .map(k => esc(k) + '=' + esc(params[k]))
                .join('&');
            url = url.concat("?", query);
        }
        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: tempHeaders,
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
        }).then(response => response.json()); // parses response to JSON
    };

    /**
     * PUT
     * @param {地址} url 
     * @param {参数(可空)} formData 
     * @param {请求头部信息(可空)} headers 
     */
    static PUT = (url, formData, headers) => {
        if (!url) {
            return;
        }
        let tempHeaders = { 'Content-Type': 'application/json' };
        let tempPostData = {};
        if (headers) {
            tempHeaders = Object.assign({}, headers);
        }
        if (formData) {
            tempPostData = Object.assign({}, formData);
        }
        return fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: tempHeaders,
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: tempPostData
        }).then(response => response.json()); // parses response to JSON
    };
}
