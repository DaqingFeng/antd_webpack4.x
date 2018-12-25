import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';

import { injectIntl } from 'react-intl';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'react-redux';
import GlobalHeader from '../../components/GlobalHeader';
import TopNavHeader from '../../components/TopNavHeader';
import { getNotice, clearnNotice } from '../../actions/systemSettingActions';

import styles from './Header.less';
const { Header } = Layout;

class HeaderView extends PureComponent {
  state = {
    visible: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed } = this.props;
    const { fixedHeader, layout } = this.props;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };


  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'userCenter') {
      this.props.history.push('/account/center');
      return;
    }
    if (key === 'triggerError') {
      this.props.history.push('/exception/500');
      return;
    }
    if (key === 'userinfo') {
      this.props.history.push('/account/settings/base');
      return;
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  handleNoticeClear = type => {
    message.success(`${this.props.intl.formatMessage({ id: 'component.noticeIcon.cleared' })} ${type}`);
    this.props.clearnNotice();
  };


  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.getNotice();
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
          this.scrollTop = scrollTop;
          return;
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
    this.ticking = false;
  };

  render() {
    const { isMobile, handleMenuCollapse } = this.props;
    const { navTheme, layout, fixedHeader } = this.props;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
        {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        ) : (
            <GlobalHeader
              onCollapse={handleMenuCollapse}
              onNoticeClear={this.handleNoticeClear}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
              {...this.props}
            />
          )}
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.currentUserReduce,
    collapsed: state.systemSettingReduce.global.collapsed,
    notices: state.noticeReduce.notice,
  }),
  dispatch => ({
    clearnNotice: bindActionCreators(clearnNotice, dispatch),
    getNotice: bindActionCreators(getNotice, dispatch),
  }))(injectIntl(HeaderView));
