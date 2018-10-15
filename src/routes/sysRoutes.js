import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Home } from './lazyComponents';

export default sysRoutes = [{
    title: '首页',
    path: '/home/index',
    icon: 'home',
    Component: Home,
}]