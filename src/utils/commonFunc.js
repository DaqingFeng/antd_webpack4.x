import * as  setting from '../setting/appSettings';

export default class commonFunc {

    /*通过controller获取$scope对象*/
    static getScope(controllerName) {
        var appElement = document.querySelector('[ng-controller=' + controllerName + ']');
        return angular.element(appElement).scope();
    }

    static scriptToText(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    /**
      * 获取当前服务url根地址
      * @param {Path} path  route路径
      */
    static getUrl(path) {
        let self = this;
        let viturapath = setting.vitrualPath;
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        var baseurl = window.location.origin;
        if (path.charAt(0) != '/') {
            path = '/' + path;
        }
        if (viturapath.length > 0) {
            if (viturapath.charAt(0) != '/') {
                viturapath = "/" + viturapath;
            }
        }
        return baseurl + viturapath + path;
    }

    /**
     * 获取当前服务url根地址
     * @param {Path} path  route路径
     */
    static getWsDomainUrl(path, defaultDomain = null) {
        let self = this;
        let url = "";
        if (defaultDomain == null) {
            url = "ws://" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        else {
            url = "ws://" + defaultDomain;
        }
        let viturapath = setting.vitrualPath;
        var baseurl = url;
        if (path.charAt(0) != '/') {
            path = '/' + path;
        }
        if (viturapath.length > 0) {
            if (viturapath.charAt(0) != '/') {
                viturapath = "/" + viturapath;
            }
        }
        return baseurl + viturapath + path;
    }

    /**克隆对象 */
    static clone(obj) {
        return (JSON.parse(JSON.stringify(obj)));
    }

    /**
     * 数字转换为数组
     * @param {Start} 起始数字
     * @param {End} 结束数字
     */
    static numberToRange(start, end) {
        let lst = [];
        for (let i = start; i <= end; i++) {
            lst.push(i);
        }
        return lst;
    }

    /**
     * 是否为EnterKey
     * @param {*event} 事件  
     */
    static IsEnterKey(event) {
        var code = event.keyCode || event.which;
        if (code == 13) {
            return true;
        }
        return false;
    }

    /**Get参数转化为json对象 */
    static searchToObject(params) {
        var namelst = [];
        var pairs = params.split("&"),
            obj = {},
            pair,
            i;

        for (i in pairs) {
            if (pairs[i] === "") continue;
            pair = pairs[i].split("=");
            let exist = false;
            namelst.forEach((value, index) => {
                if (value[0] == pair[0]) {
                    exist = true;
                }
            });
            if (!exist) {
                namelst.push(pair);
                obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            else {
                obj[decodeURIComponent(pair[0])] += ',' + decodeURIComponent(pair[1]);
            }
        }
        return obj;
    }

    /**\/Date的时间字符串转换为时间 */
    static formatDate(timespan) {
        var reg = new RegExp("\/Date");
        if (reg.test(timespan)) {
            timespan = timespan.replace("/Date(", "").replace(")", "").replace("/", "");
        }
        var dt = new Date(parseInt(timespan));
        dt = dt.toLocaleString();
        return dt;
    }

    /**获得某月的最后一天 */
    static getCurrentMonthLast() {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    }

    /**获取当前时间 */
    static getNowFormatDate(custMonth = undefined, custDate = undefined) {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (custMonth != undefined) {
            month = custMonth;
        }
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }

        if (custDate != undefined) {
            strDate = custDate;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (strDate)
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    /**获取当前时间 */
    static getNowFormatDateTime() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }

}