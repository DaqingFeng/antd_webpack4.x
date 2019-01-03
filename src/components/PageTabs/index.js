import React, { Component } from 'react';
import { Tabs } from 'antd';
import { injectIntl } from 'react-intl';

const TabPane = Tabs.TabPane;

class PageTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabDatas: [],
            activeKey: null
        }
    }

    existTabInPannel = (tabDatas, tabData) => {
        var exist = false;
        tabDatas.forEach((value, idx) => {
            if (value.path == tabData.path) {
                exist = true;
            }
        });
        return exist;
    }

    removeTabInPannel = (tabDatas, targetKey) => {
        var tabData = null;
        tabDatas.forEach((value, idx) => {
            if (value.path == targetKey) {
                tabDatas.splice(idx, 1);
                tabData = tabDatas[idx - 1];
            }
        });
        return Object.assign({ tabDatas: tabDatas, activeKey: tabData ? tabData.path : null });
    }

    getTabDatas = () => {
        const openTab = Object.assign(this.props.openTab, { IsRoot: this.props.IsRoot }, { children: this.props.children });
        const { tabDatas } = this.state;
        if (tabDatas) {
            if (!this.existTabInPannel(tabDatas, openTab)) {
                tabDatas.push(openTab);
                this.setState({
                    tabDatas: tabDatas,
                    activeKey: openTab.path,
                });
            }
        }
    }

    onTabChange = (activeKey) => {
        this.setState({
            activeKey: activeKey
        });
        this.props.history.push(activeKey);
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        const { tabDatas } = this.state;
        const removedDatas = this.removeTabInPannel(tabDatas, targetKey);
        this.setState({
            tabDatas: removedDatas.tabDatas,
            activeKey: removedDatas.activeKey,
        });
        //push new route.
        if (removedDatas.activeKey) {
            this.props.history.push(removedDatas.activeKey);
        }
    }

    render() {
        this.getTabDatas();
        const { tabDatas, activeKey } = this.state;
        const { openTab } = this.props;
        var openKey = activeKey;
        if (openTab) {
            openKey = openTab.path;
        }
        return (
            <Tabs hideAdd activeKey={openKey} onEdit={this.onEdit} type="editable-card" onChange={this.onTabChange}>
                {tabDatas.map(pane =>
                    <TabPane tab={this.props.intl.formatMessage({ id: pane.locale })} key={pane.path} closable={!pane.IsRoot}>
                        {pane.children}
                    </TabPane>)
                }
            </Tabs>
        );
    }
}
export default injectIntl(PageTabs);