import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';
import { vitrualPath } from '../setting/appSettings';

export default class commonFunc {

    static scriptToText(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    /**
     * 是否为正确的Email地址 
     * @param {email} email 地址
     */
    static isValidEmail(email) {
        if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return false;
        }
        return true;
    }


    /**
      * 获取当前服务url根地址
      * @param {Path} path  route路径
      */
    static getUrl(path) {
        let self = this;
        let viturapath = vitrualPath;
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

    static urlToList(url) {
        if (!url) { return []; }
        const urllist = url.split('/').filter(i => i);
        return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
    }


    static fixedZero(val) {
        return val * 1 < 10 ? `0${val}` : val;
    }

    static getTimeDistance(type) {
        const now = new Date();
        const oneDay = 1000 * 60 * 60 * 24;

        if (type === 'today') {
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
            return [moment(now), moment(now.getTime() + (oneDay - 1000))];
        }

        if (type === 'week') {
            let day = now.getDay();
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);

            if (day === 0) {
                day = 6;
            } else {
                day -= 1;
            }

            const beginTime = now.getTime() - day * oneDay;

            return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
        }

        if (type === 'month') {
            const year = now.getFullYear();
            const month = now.getMonth();
            const nextDate = moment(now).add(1, 'months');
            const nextYear = nextDate.year();
            const nextMonth = nextDate.month();

            return [
                moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
                moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
            ];
        }

        const year = now.getFullYear();
        return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
    }

    static getPlainNode(nodeList, parentPath = '') {
        const arr = [];
        nodeList.forEach(node => {
            const item = node;
            item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
            item.exact = true;
            if (item.children && !item.component) {
                arr.push(...getPlainNode(item.children, item.path));
            } else {
                if (item.children && item.component) {
                    item.exact = false;
                }
                arr.push(item);
            }
        });
        return arr;
    }

    static digitUppercase(n) {
        return nzh.toMoney(n);
    }

    getRelation(str1, str2) {
        if (str1 === str2) {
            console.warn('Two path are equal!'); // eslint-disable-line
        }
        const arr1 = str1.split('/');
        const arr2 = str2.split('/');
        if (arr2.every((item, index) => item === arr1[index])) {
            return 1;
        }
        if (arr1.every((item, index) => item === arr2[index])) {
            return 2;
        }
        return 3;
    }

    getRenderArr(routes) {
        let renderArr = [];
        renderArr.push(routes[0]);
        for (let i = 1; i < routes.length; i += 1) {
            // 去重
            renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
            // 是否包含
            const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
            if (isAdd) {
                renderArr.push(routes[i]);
            }
        }
        return renderArr;
    }

    /**
     * Get router routing configuration
     * { path:{name,...param}}=>Array<{name,path ...param}>
     * @param {string} path
     * @param {routerData} routerData
     */
    static getRoutes(path, routerData) {
        let routes = Object.keys(routerData).filter(
            routePath => routePath.indexOf(path) === 0 && routePath !== path
        );
        // Replace path to '' eg. path='user' /user/name => name
        routes = routes.map(item => item.replace(path, ''));
        // Get the route to be rendered to remove the deep rendering
        const renderArr = getRenderArr(routes);
        // Conversion and stitching parameters
        const renderRoutes = renderArr.map(item => {
            const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
            return {
                exact,
                ...routerData[`${path}${item}`],
                key: `${path}${item}`,
                path: `${path}${item}`,
            };
        });
        return renderRoutes;
    }

    static getPageQuery() {
        return parse(window.location.href.split('?')[1]);
    }

    static getQueryPath(path = '', query = {}) {
        const search = stringify(query);
        if (search.length) {
            return `${path}?${search}`;
        }
        return path;
    }

    static isUrl(path) {
        /* eslint no-useless-escape:0 */
        const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
        return reg.test(path);
    }

    static formatWan(val) {
        const v = val * 1;
        if (!v || Number.isNaN(v)) return '';

        let result = val;
        if (val > 10000) {
            result = Math.floor(val / 10000);
            result = (
                <span>
                    {result}
                    <span
                        styles={{
                            position: 'relative',
                            top: -2,
                            fontSize: 14,
                            fontStyle: 'normal',
                            lineHeight: 20,
                            marginLeft: 2,
                        }}
                    >
                        万
              </span>
                </span>
            );
        }
        return result;
    }

    static isAntdPro() {
        return window.location.hostname === 'preview.pro.ant.design';
    }

}