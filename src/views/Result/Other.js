import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
export default class Other extends Component {
    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <p>I would</p>
                    <p>really like</p>
                    <p>to render</p>
                    <p>an array</p>
                </Card>
            </PageHeaderWrapper>
        );
    }
}