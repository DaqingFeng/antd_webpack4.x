import React, { Component } from 'react';
import Loadable from 'react-loadable';
import PageLoading from '../PageLoading/index';

const Loader = (loader) =>
    Loadable({
        loader: loader,
        loading: PageLoading,
        timeout: 3000,
        /* devblock:start */
        delay: 60
        /* devblock:end */
    });
export default Loader;

