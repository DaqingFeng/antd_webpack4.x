import React, { PureComponent } from 'react';
import { Select, message, Drawer, List, Switch, Divider, Icon, Button, Alert, Tooltip, Row, Col } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import omit from 'omit.js';
import styles from './index.less';
import ThemeColor from './ThemeColor';
import BlockChecbox from './BlockChecbox';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import cookiesHelper from '../../utils/cookiesHelper';

import * as sysActions from '../../actions/systemSettingActions';
import * as  globalVariables from '../../utils/globalVariables';

const { Option } = Select;
const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);

class SettingDrawer extends PureComponent {

  state = {
    collapse: false,
  };

  changeSetting = (key, value) => {
    const nextState = { ...this.props.setting };
    nextState[key] = value;
    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    } else if (key === 'fixedHeader' && !value) {
      nextState.autoHideHeader = false;
    }
    this.props.updateSetting(nextState);
  };

  saveSettingToCookie = () => {
    const settingStr = JSON.stringify(this.props.setting);
    cookiesHelper.createCookie(globalVariables.ThemeSettingCookieName, settingStr, 5);
    message.success(this.props.intl.formatMessage({ id: 'app.setting.cookieInfo' }))
  }


  togglerContent = () => {
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };


  renderLayoutSettingItem = item => {
    const action = React.cloneElement(item.action, {
      disabled: item.disabled,
    });
    return (
      <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
        <List.Item actions={[action]}>
          <span style={{ opacity: item.disabled ? '0.5' : '' }}>{item.title}</span>
        </List.Item>
      </Tooltip>
    );
  };

  getLayoutSetting = () => {
    const { contentWidth, fixedHeader, usingTabs, layout, autoHideHeader, fixSiderbar } = this.props.setting;
    return [
      {
        title: this.props.intl.formatMessage({ id: 'app.setting.content-width' }),
        action: (
          <Select
            value={contentWidth}
            size="small"
            onSelect={value => this.changeSetting('contentWidth', value)}
            style={{ width: 80 }}
          >
            {layout === 'sidemenu' ? null : (
              <Option value="Fixed">
                {this.props.intl.formatMessage({ id: 'app.setting.content-width.fixed' })}
              </Option>
            )}
            <Option value="Fluid">
              {this.props.intl.formatMessage({ id: 'app.setting.content-width.fluid' })}
            </Option>
          </Select>
        ),
      },
      {
        title: this.props.intl.formatMessage({ id: 'app.setting.fixedheader' }),
        action: (
          <Switch
            size="small"
            checked={!!fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />
        ),

      },
      {
        title: this.props.intl.formatMessage({ id: 'app.setting.hideheader' }),
        disabled: !fixedHeader,
        disabledReason: this.props.intl.formatMessage({ id: 'app.setting.hideheader.hint' }),
        action: (
          <Switch
            size="small"
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />
        ),
      },
      {
        title: this.props.intl.formatMessage({ id: 'app.setting.fixedsidebar' }),
        disabled: layout === 'topmenu',
        disabledReason: this.props.intl.formatMessage({ id: 'app.setting.fixedsidebar.hint' }),
        action: (
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => this.changeSetting('fixSiderbar', checked)}
          />
        ),
      },
      {
        title: this.props.intl.formatMessage({ id: 'app.setting.UsingTabs' }),
        action: (
          <Switch
            size="small"
            checked={!!usingTabs}
            onChange={checked => this.changeSetting('usingTabs', checked)}
          />
        )
      },
    ];
  };


  render() {
    const { navTheme, primaryColor, layout, colorWeak } = this.props.setting;
    const { collapse } = this.state;
    return (
      <Drawer
        visible={collapse}
        width={300}
        onClose={this.togglerContent}
        placement="right"
        handler={
          <div className={styles.handle}>
            <Icon
              type={collapse ? 'close' : 'setting'}
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          </div>
        }
        onHandleClick={this.togglerContent}
        style={{
          zIndex: 999,
        }}
      >
        <div className={styles.content}>
          <Body title={this.props.intl.formatMessage({ id: 'app.setting.pagestyle' })}>
            <BlockChecbox
              list={[
                {
                  key: 'dark',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                  title: this.props.intl.formatMessage({ id: 'app.setting.pagestyle.dark' }),
                },
                {
                  key: 'light',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                  title: this.props.intl.formatMessage({ id: 'app.setting.pagestyle.light' }),
                },
              ]}
              value={navTheme}
              onChange={value => this.changeSetting('navTheme', value)}
            />
          </Body>

          <ThemeColor
            title={this.props.intl.formatMessage({ id: 'app.setting.themecolor' })}
            value={primaryColor}
            onChange={color => this.changeSetting('primaryColor', color)}
          />

          <Divider />

          <Body title={this.props.intl.formatMessage({ id: 'app.setting.navigationmode' })}>
            <BlockChecbox
              list={[
                {
                  key: 'sidemenu',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                  title: this.props.intl.formatMessage({ id: 'app.setting.sidemenu' }),
                },
                {
                  key: 'topmenu',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                  title: this.props.intl.formatMessage({ id: 'app.setting.topmenu' }),
                },
              ]}
              value={layout}
              onChange={value => this.changeSetting('layout', value)}
            />
          </Body>

          <List
            split={false}
            dataSource={this.getLayoutSetting()}
            renderItem={this.renderLayoutSettingItem}
          />
          <Divider />

          <Body title={this.props.intl.formatMessage({ id: 'app.setting.othersettings' })}>
            <List.Item
              actions={[
                <Switch
                  size="small"
                  checked={!!colorWeak}
                  onChange={checked => this.changeSetting('colorWeak', checked)}
                />,
              ]}
            >
              {this.props.intl.formatMessage({ id: 'app.setting.weakmode' })}
            </List.Item>
          </Body>
          <Divider />
          <div>
            <Row>
              <Col span={10}>
                <CopyToClipboard
                  text={JSON.stringify(omit(this.props.setting, ['colorWeak']), null, 2)}
                  onCopy={() => message.success(this.props.intl.formatMessage({ id: 'app.setting.copyinfo' }))}
                >
                  <Button block icon="copy">
                    {this.props.intl.formatMessage({ id: 'app.setting.copy' })}
                  </Button>
                </CopyToClipboard>
              </Col>
              <Col span={4}></Col>
              <Icon />
              <Col span={10}>
                <Button block icon="setting" onClick={this.saveSettingToCookie} >
                  {this.props.intl.formatMessage({ id: 'app.setting.cookie' })}
                </Button>
              </Col>
            </Row>
          </div>
          <Alert
            type="warning"
            className={styles.productionHint}
            message={
              <div>
                {this.props.intl.formatMessage({ id: 'app.setting.production.hint' })}{' '}
                <a
                  href="https://u.ant.design/pro-v2-default-settings"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
              </div>
            }
          />
        </div>
      </Drawer>
    );
  }
}
export default connect(
  state => ({
    setting: state.systemSettingReduce
  }),
  dispatch => ({
    updateSetting: bindActionCreators(sysActions.updateSystemSetting, dispatch)
  }))(injectIntl(SettingDrawer))