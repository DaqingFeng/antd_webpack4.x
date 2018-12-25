import React, { Component, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Icon, List } from 'antd';

class BindingView extends Component {
  getData = () => [
    {
      title: this.props.intl.formatMessage({ id: 'app.settings.binding.taobao' }, {}),
      description: this.props.intl.formatMessage({ id: 'app.settings.binding.taobao-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="taobao" className="taobao" />,
    },
    {
      title: this.props.intl.formatMessage({ id: 'app.settings.binding.alipay' }, {}),
      description: this.props.intl.formatMessage({ id: 'app.settings.binding.alipay-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="alipay" className="alipay" />,
    },
    {
      title: this.props.intl.formatMessage({ id: 'app.settings.binding.dingding' }, {}),
      description: this.props.intl.formatMessage({ id: 'app.settings.binding.dingding-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="dingding" className="dingding" />,
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default injectIntl(BindingView);
