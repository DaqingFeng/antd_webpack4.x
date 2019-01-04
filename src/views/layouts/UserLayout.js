import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { renderRoutes } from 'react-router-config';
import { Icon } from 'antd';
import { menuFormatter } from '../../utils/pathTools';
import GlobalFooter from '../../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../../assets/logo.svg';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);



class UserLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
  }

  componentDidUpdate() {
    // if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
  }

  getMenuData() {
    const { sysMenus } = this.props;
    return menuFormatter(sysMenus);
  }

  /**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      if (!Array.isArray(data)) {
        return;
      }
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }


  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);
    if (!currRouterData) {
      return 'Ant Design Pro';
    }
    const message = this.props.intl.formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });
    return `${message} - Ant Design Pro`;
  };

  render() {
    const { routes } = this.props.route;
    return (
      <DocumentTitle title={this.getPageTitle(this.props.location.pathname)}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Ant Daqing</span>
                </Link>
              </div>
              <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
            </div>
            {renderRoutes(routes)}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}
export default connect((state) => ({
  sysMenus: state.getSystemRoutesReduce.routes
}))(injectIntl(UserLayout));
