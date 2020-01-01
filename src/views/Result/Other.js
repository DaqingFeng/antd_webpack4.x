import React, { Component } from 'react';
import { Card, Input,Button,Modal } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
export default class Other extends Component {
    state = { visible: false };

    constructor(props) {
        super(props);
    }

    clickShowModel(){
      this.setState({
        visible:true
      })
    }

    okClick()
    {
        this.setState({
            visible:false
        })
    }

    cancelClick()
    {
        this.setState({
           visible:false
        });
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <p>I would</p>
                    <Input type="text" size="small" style={{ width: 78 }} />
                    <Button onClick={()=>this.clickShowModel()}>open Modal</Button>
                     <Modal visible={this.state.visible} onOk={()=>this.okClick()} onCancel={()=>this.cancelClick()}>   
                         <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        </Modal>
                    <p>really like</p>
                    <p>to render</p>
                    <p>an array</p>
                </Card>

            </PageHeaderWrapper>
        );
    }
}