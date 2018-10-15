import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import Loadable from 'react-loadable';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const Loader = (loader) =>
    Loadable({
        loader,
        loading: antIcon,
        timeout: 10000,
        /* devblock:start */
        delay: 1000
        /* devblock:end */
    });

export default Loader;

