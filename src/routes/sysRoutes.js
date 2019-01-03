import lazyComponents from './lazyComponents';
import { homePageUrl } from "../setting/appSettings";
import { Redirect } from 'react-router';

/**System Routes Config  */
const sysRoutes = [
    {
        component: lazyComponents.appComponent,
        routes: [
            {
                path: '/',
                exact: true,
                component: () => <Redirect to={homePageUrl} />,
            },
            {
                path: '/login',
                exact: true,
                component: lazyComponents.userLogin,
            },
            {
                path: "/exception/403",
                name: "no permission",
                component: lazyComponents.exception403,
            },
            {
                path: "/exception/404",
                name: "not-find",
                component: lazyComponents.exception404,
            },
            {
                path: "/exception/500",
                name: "server-error",
                component: lazyComponents.exception500,
            },
            {
                path: "/exception/trigger",
                name: "trigger",
                hideInMenu: true,
                component: lazyComponents.exceptionTrigger,
            },
            {
                path: "/user/login",
                component: lazyComponents.userLogin,
                exact: true
            },
            {
                path: "/user/register",
                component: lazyComponents.userRegister,
                exact: true
            },
            {
                path: "/user/register-result",
                component: lazyComponents.userRegisterResult,
                exact: true
            },
            {
                path: "/result/success",
                name: "success",
                exact: true,
                component: lazyComponents.operationSuccess,
            },
            {
                name: "fail",
                path: "/result/fail",
                exact: true,
                component: lazyComponents.operationError,
            },
            {
                name: "other",
                path: "/result/other",
                exact: true,
                component: lazyComponents.operationOther,
            },
            {
                component: lazyComponents.exception404,
            }
        ]
    }
];
export default sysRoutes;