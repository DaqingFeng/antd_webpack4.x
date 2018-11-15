import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';
import DocumentTitle from 'react-document-title';
import { injectIntl, FormattedMessage } from 'react-intl';

import ShowBox from "../../actions/messageBoxActions.js";
import { messageBoxType } from '../../utils/Enums.js';
import './index.css';
import MessageBox from '../../components/MessageBox/MessageBox';

class Home extends Component {
  constructor(props) {
    super(props);

  }

  intlCmp() {
    var str = this.props.intl.formatMessage({ id: 'component.globalHeader.searchx', defaultMessage: 'Please choose a color' });
    return str;
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  btnClickListen(event) {
    this.props.showBox(messageBoxType.SUCCESS, "确认提交吗?", (args) => {
      console.log(args);
    });
  }

  btnConfrimClickListen(event) {
    this.props.showBox(messageBoxType.WARNING, "确认提交吗?", (args) => {
      console.log(args);
    });
  }

  render() {
    const { intl } = this.props;
    return (
      <DocumentTitle title="Welcome">
        <div>
          <Row>
            <Col span={12}>
            <MessageBox/>
              <FormattedMessage id="component.globalHeader.search">
                {(txt) => (
                  <a>
                    {txt}
                  </a>
                )}
              </FormattedMessage>
              {this.intlCmp()}
            </Col>
            <Col span={12}>col-12</Col>
          </Row>
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}><Button type="primary" value="small" onClick={this.btnClickListen.bind(this)}>ShowDialog</Button></Col>
            <Col span={8}>col-8<Button type="primary" value="small" onClick={this.btnConfrimClickListen.bind(this)}>Confirm</Button></Col>
          </Row>
          <Row>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
          </Row>
        </div>
      </DocumentTitle>
    );
  }
}



export default connect(state => (
  {
    messagebox: state.messageBoxReduce || {},
  }),
  dispatch => ({
    showBox: bindActionCreators(ShowBox, dispatch)
  }))(injectIntl(Home))
