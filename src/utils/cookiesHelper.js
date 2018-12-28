export default class cookiesHelper {

    /**
     * 创建Cookie
     * @param {Cookie名称} name 
     * @param {Cookie值} value 
     * @param {过期[天]} days 
     */
    static createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    /**
     * 读取Cookie
     * @param {Cookie名称} name 
     */
    static readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     * 移除Cookie
     * @param {Cookie名称} name 
     */
    static removeCookie(name) {
        cookiesHelper.createCookie(name, "", -1);
    }
};