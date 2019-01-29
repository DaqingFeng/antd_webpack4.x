import React, { Component } from 'react';
import { Tabs,Icon } from 'antd';
import { injectIntl } from 'react-intl';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
const TabPane = Tabs.TabPane;


class PageTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabDatas: [],
            activeKey: null
        }
    }

    componentDidUpdate() {
        this.getTabDatas();
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


    getComponent = (key) => {
        let component = null;
        const { routes } = this.props.route;
        routes.forEach((item, idx) => {
            if (item.path == key) {
                component = item.component;
            }
        });
        if (!component) {
            component = routes[routes.length - 1].component;
        }
        return component;
    }

    getTabDatas = () => {
        const { tabDatas } = this.state;
        const { isRoot, openTab } = this.props;
        const component = this.getComponent(openTab.path);
        const insertOpenTab = Object.assign(openTab, { isRoot: isRoot }, { children: component });
        if (tabDatas) {
            if (!this.existTabInPannel(tabDatas, insertOpenTab)) {
                if (insertOpenTab.isRoot) {
                    tabDatas.unshift(insertOpenTab);
                }
                else {
                    tabDatas.push(insertOpenTab);
                }
                this.setState({
                    tabDatas: tabDatas,
                    activeKey: insertOpenTab.path,
                });
            }
        }
    }

    tabContextMenu() {
        return (<div >
            <ContextMenuTrigger id="some_unique_identifier">
                <div className="well">Right click to see the menu</div>
            </ContextMenuTrigger>
            <ContextMenu id="some_unique_identifier">
                <MenuItem data={{ foo: 'bar' }} onClick={this.onContextMenuClick}>
                <Icon type="user" />  ContextMenu Item 1
              </MenuItem>
                <MenuItem data={{ foo: 'bar' }} onClick={this.onContextMenuClick}>
                    ContextMenu Item 2
              </MenuItem>
                <MenuItem divider />
                <MenuItem data={{ foo: 'bar' }} onClick={this.onContextMenuClick}>
                    ContextMenu Item 3
              </MenuItem>
            </ContextMenu>
        </div>);
    }

    onContextMenuClick = (e, data) => {
        console.log(data.foo);
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
        const { tabDatas, activeKey } = this.state;
        const { openTab } = this.props;
        var openKey = activeKey;
        if (openTab) {
            openKey = openTab.path;
        }
        return (
            <div>
                <Tabs hideAdd activeKey={openKey} onEdit={this.onEdit} type="editable-card" onChange={this.onTabChange}>
                    {tabDatas.map(pane =>
                        <TabPane tab={this.props.intl.formatMessage({ id: pane.locale })} key={pane.path} closable={!pane.isRoot}>
                            <pane.children />
                        </TabPane>)
                    }
                </Tabs>
                {this.tabContextMenu()}
            </div>
        );
    }
}
export default injectIntl(PageTabs);