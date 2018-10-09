import React, { Component } from 'react';
import { Button } from 'antd';
export default class Hello extends Component {
  render() {
    return (
      <div>Hello World!
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
      </div>
    );
  }
}
