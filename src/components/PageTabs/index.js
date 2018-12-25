import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class PageTabs extends Component {
    constructor(props) {
        super(props);
        const panes = [
            { title: '其它', key: '/result/other', closable: false },
            { title: '403', key: '/exception/403' },
            { title: '404', key: '/exception/404' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    onTabChange = (activeKey) => {
        this.props.history.push(activeKey);
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `/exception/500`;
        panes.push({ title: '500', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
        this.onTabChange(activeKey);
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render() {
        return (
            <Tabs  activeKey={this.state.activeKey}  onEdit={this.onEdit} type="editable-card" onChange={this.onTabChange}>
                {this.state.panes.map(pane =>
                    <TabPane tab={pane.title} key={pane.key}
                        closable={pane.closable}>{pane.content}
                    </TabPane>)}
            </Tabs>
        );
    }
}