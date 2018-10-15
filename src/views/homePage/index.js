import React, { Component } from 'react';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import './index.css';
import { isSymbol } from 'util';
import DocumentTitle from 'react-document-title';

export default class Home extends Component {

  componentDidMount() {
    this.enquireHandler = enquireScreen(ismobile => {
      console.log(ismobile);
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  render() {
    return (
      <DocumentTitle title="Welcome">
        <div>
          <Row>
            <Col span={12}>col-12</Col>
            <Col span={12}>col-12</Col>
          </Row>
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
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


