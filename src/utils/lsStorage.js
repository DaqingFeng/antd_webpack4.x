const lsStorage = (function () {
    var ls = {};
    ls.hasData = function (key) {
        return !!localStorage[key] && !!localStorage[key].length;
    }
    ls.get = function (key) {
        if (!this.hasData(key)) {
            return false;
        }
        var data = localStorage[key];
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return data;
        }
    }
    ls.set = function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) { localStorage.setItem(key, value); }
    }
    ls.extend = function (key, value) {
        if (this.hasData(key)) {
            var _value = this.get(key);
            $.extend(_value, JSON.parse(JSON.stringify(value)));
            this.set(key, _value);
        }
        else {
            this.set(key, value);
        }
    }
    ls.remove = function (key) {
        localStorage.removeItem(key);
    }
    return ls;
}());
export default lsStorage;