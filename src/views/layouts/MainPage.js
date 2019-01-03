import React, { Component } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'react-redux';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { injectIntl } from 'react-intl';
import { renderRoutes } from 'react-router-config'


import Context from './MenuContext';
import * as sysActions from '../../actions/systemSettingActions';
import SiderMenu from '../../components/SiderMenu';
import commonFunc from '../../utils/commonFunc';
import { homePageUrl } from "../../setting/appSettings";
import SettingDrawer from '../../components/SettingDrawer';
import logo from '../../assets/logo.svg';
import Footer from './Footer';
import PageTabs from "../../components/PageTabs";
import Header from './Header';
const { Content } = Layout;

// Conversion router to menu.
const formatter = (data, parentPath = '', parentName) => {
  if (!Array.isArray(data))
    return;
  return data.map(item => {
    let locale = 'menu';
    if (parentName && item.name) {
      locale = `${parentName}.${item.name}`;
    } else if (item.name) {
      locale = `menu.${item.name}`;
    } else if (parentName) {
      locale = parentName;
    }
    const result = {
      ...item,
      locale
    };
    if (item.routes) {
      const children = formatter(item.routes, `${parentPath}${item.path}/`, locale);
      // Reduce memory usage
      result.children = children;
    }
    delete result.routes;
    return result;
  });
}

//Reponsivee 
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.props.getSysSetting();
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
    this.state = {
      rendering: true,
      isMobile: false,
    };
  }

  componentDidMount() {
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.registerResizeEvent();
  }

  componentDidUpdate(preProps) {
    const { isMobile } = this.state;
    const { collapsed } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.props.handleMenuCollapse(false);
    }
    // if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
  }

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap,
    };
  }

  getMenuData() {
    const { routes } = this.props;
    return formatter(routes);
  }

  /**浏览器尺寸注册 */
  registerResizeEvent() {
    var mobile = commonFunc.isMobile();
    window.addEventListener("resize", () => {
      let mobile = commonFunc.isMobile();
      this.setMobileState(mobile);
    });
    this.setMobileState(mobile);
  }


  setMobileState(mobile) {
    const { isMobile } = this.state;
    if (isMobile !== mobile) {
      this.setState({
        isMobile: mobile,
      });
    }
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


  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getPathInfo = () => {
    let path = location.pathname;
    let isRoot = false;
    if (path == "/" || path == homePageUrl) {
      path = homePageUrl;
      isRoot = true;
    }
    return { path: path, isRoot: isRoot };
  };

  getContentStyle = () => {
    const { fixedHeader, usingTabs } = this.props;
    if (usingTabs) {
      return {
        margin: '5px 24px 0',
        paddingTop: fixedHeader ? 64 : 0,
      };
    }
    else {
      return {
        margin: '24px 24px 0',
        paddingTop: fixedHeader ? 64 : 0,
      };
    }
  };

  renderSettingDrawer() {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    const { rendering } = this.state;
    if (rendering || process.env.NODE_ENV === 'production') {
      return null;
    }
    return <SettingDrawer />;
  }

  /**Normal Layout */
  normalLayout = () => {
    const {
      navTheme,
      layout: PropsLayout,
    } = this.props;
    const { isMobile } = this.state;
    const isTop = PropsLayout === 'topmenu';
    const menuData = this.getMenuData();
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.props.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.props.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content style={this.getContentStyle()}>
            {renderRoutes(this.props.route.routes)}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
    return (
      < React.Fragment >
        <DocumentTitle title={this.getPageTitle(location.pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        {this.renderSettingDrawer()}
      </React.Fragment >
    );
  };

  /**Tab Layout */
  tabpannelLayout = () => {
    const {
      navTheme,
      layout: PropsLayout,
    } = this.props;
    const { isMobile } = this.state;
    const isTop = PropsLayout === 'topmenu';
    const menuData = this.getMenuData();
    const pathInfo = this.getPathInfo();
    const currentmenuData = this.matchParamsPath(pathInfo.path);
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.props.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.props.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content style={this.getContentStyle()}>
            <PageTabs openTab={currentmenuData} IsRoot={pathInfo.isRoot}  {...this.props} >
              {renderRoutes(this.props.route.routes)}
            </PageTabs>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
    return (
      <React.Fragment >
        <DocumentTitle title={this.getPageTitle(location.pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        {this.renderSettingDrawer()}
      </React.Fragment >
    );
  };


  render() {
    const {
      usingTabs
    } = this.props;
    if (usingTabs) {
      return this.tabpannelLayout();
    }
    else {
      return this.normalLayout();
    }
  }
}

const mapdispatchToProps = (dispatch) => {
  return {
    handleMenuCollapse: (collapsed) => dispatch(sysActions.changeCollapse(collapsed)),
    getSysSetting: (setting) => dispatch(sysActions.getSystemSetting(setting))
  }
}

const mapStateToProps = (state) => {
  return {
    collapsed: state.changeCollapseReduce.collapsed,
    layout: state.systemSettingReduce.layout,
    routes: state.getSystemRoutesReduce.routes,
    ...state.systemSettingReduce,
  }
}

export default connect(
  mapStateToProps,
  mapdispatchToProps
)(injectIntl(MainPage));
