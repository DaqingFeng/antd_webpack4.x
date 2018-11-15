import { connect } from 'react-redux';
//react 国际化
import { IntlProvider, addLocaleData } from 'react-intl';
import zh_CN from './zh-CN';//个人配置
import en_US from './en-US';//个人配置
import zh from 'react-intl/locale-data/zh';//react-intl语言包
import en from 'react-intl/locale-data/en';//react-intl语言包

addLocaleData([...en, ...zh]); //Add to the local

const chooseMessage = (currentLocale = navigator.language) => {
    switch (currentLocale.split('-')[0]) {
        case 'en':
            return en_US;
            break;
        case 'zh':
            return zh_CN;
            break;
        default:
            return en_US;
            break;
    }
}

function mapStateToProps(state) {
    const { lang, defaultLange } = state.changeLocaleReduce;
    const chooseMsg = chooseMessage(lang);
    return { locale: lang, defaultLocale: defaultLange, messages: chooseMsg };
}

export default connect(mapStateToProps)(IntlProvider);