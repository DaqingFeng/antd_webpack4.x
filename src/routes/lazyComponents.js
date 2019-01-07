import Loader from '../components/CustLoader/index';

export default {
    
    appComponent: Loader(() => {
        return import('../views/layouts/MainPage');
    }),

    authorized: Loader(() => {
        return import('../views/layouts/Authorized');
    }),


    //#region User Layout
    userLayout: Loader(() => {
        return import('../views/layouts/UserLayout');
    }),
    userLogin: Loader(() => {
        return import('../views/User/Login');
    }),
    userRegister: Loader(() => {
        return import('../views/User/Register');
    }),
    userRegisterResult: Loader(() => {
        return import('../views/User/RegisterResult');
    }),
    //#endregion

    //#region system Layout
    exception403: Loader(() => {
        return import('../views/Exception/403');
    }),
    exception404: Loader(() => {
        return import('../views/Exception/404');
    }),
    exception500: Loader(() => {
        return import('../views/Exception/500');
    }),
    exceptionTrigger: Loader(() => {
        return import('../views/Exception/TriggerException');
    }),
    exception404: Loader(() => {
        return import('../views/Exception/404');
    }),
    operationSuccess: Loader(() => {
        return import('../views/Result/Success');
    }),
    operationError: Loader(() => {
        return import('../views/Result/Error');
    }),
    operationOther: Loader(() => {
        return import('../views/Result/Other');
    }),
     //#endregion
}
