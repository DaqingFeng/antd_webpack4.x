import React, { Component } from 'react';
import { Card, Input } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
export default class Other extends Component {
    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <p>I would</p>
                    <Input type="text" size="small" style={{ width: 78 }} />
                    <p>really like</p>
                    <p>to render</p>
                    <p>an array</p>
                </Card>
            </PageHeaderWrapper>
        );
    }
}