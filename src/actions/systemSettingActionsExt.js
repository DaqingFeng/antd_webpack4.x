import commonFunc from '../utils/commonFunc';
import { reloadAuthorized } from '../utils/Authorized';
export const loginInSystem = (userInfo) => {
    reloadAuthorized();
    const urlParams = new URL(window.location.href);
    const params = commonFunc.getPageQuery();
    let { redirect } = params;
    if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
                redirect = redirect.substr(2);
            }
        } else {
            window.location.href = redirect;
            return;
        }
    }
    window.location.replace(redirect || '/');
}
