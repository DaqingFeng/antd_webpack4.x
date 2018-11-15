import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Home } from './lazyComponents';

/**Code Split Loading */
const sysRoutes = [
    {
        title: '首页',
        path: '/home',
        icon: 'home',
        component: Home,
    }];
export default sysRoutes;

/**Ali template Config  */
export const routesConfig = [
    // user
    {
        path: '/user',
        component: '../views/layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: '../views/User/Login' },
            { path: '/user/register', component: '../views/User/Register' },
            { path: '/user/register-result', component: '../views/User/RegisterResult' },
        ],
    },
    // app
    {
        path: '/',
        component: '../views/layouts/BasicLayout',
        Routes: ['src/views/Authorized'],
        authority: ['admin', 'user'],
        routes: [
            // dashboard
            { path: '/', redirect: '/dashboard/analysis' },
            {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'dashboard',
                routes: [
                    {
                        path: '/dashboard/analysis',
                        name: 'analysis',
                        component: '../views/Dashboard/Analysis',
                    },
                    {
                        path: '/dashboard/monitor',
                        name: 'monitor',
                        component: '../views/Dashboard/Monitor',
                    },
                    {
                        path: '/dashboard/workplace',
                        name: 'workplace',
                        component: '../views/Dashboard/Workplace',
                    },
                ],
            },
            // forms
            {
                path: '/form',
                icon: 'form',
                name: 'form',
                routes: [
                    {
                        path: '/form/basic-form',
                        name: 'basicform',
                        component: '../views/Forms/BasicForm',
                    },
                    {
                        path: '/form/step-form',
                        name: 'stepform',
                        component: '../views/Forms/StepForm',
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/form/step-form',
                                name: 'stepform',
                                redirect: '/form/step-form/info',
                            },
                            {
                                path: '/form/step-form/info',
                                name: 'info',
                                component: '../views/Forms/StepForm/Step1',
                            },
                            {
                                path: '/form/step-form/confirm',
                                name: 'confirm',
                                component: '../views/Forms/StepForm/Step2',
                            },
                            {
                                path: '/form/step-form/result',
                                name: 'result',
                                component: '../views/Forms/StepForm/Step3',
                            },
                        ],
                    },
                    {
                        path: '/form/advanced-form',
                        name: 'advancedform',
                        authority: ['admin'],
                        component: '../views/Forms/AdvancedForm',
                    },
                ],
            },
            // list
            {
                path: '/list',
                icon: 'table',
                name: 'list',
                routes: [
                    {
                        path: '/list/table-list',
                        name: 'searchtable',
                        component: '../views/List/TableList',
                    },
                    {
                        path: '/list/basic-list',
                        name: 'basiclist',
                        component: '../views/List/BasicList',
                    },
                    {
                        path: '/list/card-list',
                        name: 'cardlist',
                        component: '../views/List/CardList',
                    },
                    {
                        path: '/list/search',
                        name: 'searchlist',
                        component: '../views/List/List',
                        routes: [
                            {
                                path: '/list/search',
                                redirect: '/list/search/articles',
                            },
                            {
                                path: '/list/search/articles',
                                name: 'articles',
                                component: '../views/List/Articles',
                            },
                            {
                                path: '/list/search/projects',
                                name: 'projects',
                                component: '../views/List/Projects',
                            },
                            {
                                path: '/list/search/applications',
                                name: 'applications',
                                component: '../views/List/Applications',
                            },
                        ],
                    },
                ],
            },
            {
                path: '/profile',
                name: 'profile',
                icon: 'profile',
                routes: [
                    // profile
                    {
                        path: '/profile/basic',
                        name: 'basic',
                        component: '../views/Profile/BasicProfile',
                    },
                    {
                        path: '/profile/advanced',
                        name: 'advanced',
                        authority: ['admin'],
                        component: '../views/Profile/AdvancedProfile',
                    },
                ],
            },
            {
                name: 'result',
                icon: 'check-circle-o',
                path: '/result',
                routes: [
                    // result
                    {
                        path: '/result/success',
                        name: 'success',
                        component: '../views/Result/Success',
                    },
                    {
                        path: '/result/fail',
                        name: 'fail',
                        component: '../views/Result/Error'
                    },
                ],
            },
            {
                name: 'exception',
                icon: 'warning',
                path: '/exception',
                routes: [
                    // exception
                    {
                        path: '/exception/403',
                        name: 'not-permission',
                        component: '../views/Exception/403',
                    },
                    {
                        path: '/exception/404',
                        name: 'not-find',
                        component: '../views/Exception/404',
                    },
                    {
                        path: '/exception/500',
                        name: 'server-error',
                        component: '../views/Exception/500',
                    },
                    {
                        path: '/exception/trigger',
                        name: 'trigger',
                        hideInMenu: true,
                        component: '../views/Exception/TriggerException',
                    },
                ],
            },
            {
                name: 'account',
                icon: 'user',
                path: '/account',
                routes: [
                    {
                        path: '/account/center',
                        name: 'center',
                        component: '../views/Account/Center/Center',
                        routes: [
                            {
                                path: '/account/center',
                                redirect: '/account/center/articles',
                            },
                            {
                                path: '/account/center/articles',
                                component: '../views/Account/Center/Articles',
                            },
                            {
                                path: '/account/center/applications',
                                component: '../views/Account/Center/Applications',
                            },
                            {
                                path: '/account/center/projects',
                                component: '../views/Account/Center/Projects',
                            },
                        ],
                    },
                    {
                        path: '/account/settings',
                        name: 'settings',
                        component: '../views/Account/Settings/Info',
                        routes: [
                            {
                                path: '/account/settings',
                                redirect: '/account/settings/base',
                            },
                            {
                                path: '/account/settings/base',
                                component: '../views/Account/Settings/BaseView',
                            },
                            {
                                path: '/account/settings/security',
                                component: '../views/Account/Settings/SecurityView',
                            },
                            {
                                path: '/account/settings/binding',
                                component: '../views/Account/Settings/BindingView',
                            },
                            {
                                path: '/account/settings/notification',
                                component: '../views/Account/Settings/NotificationView',
                            },
                        ],
                    },
                ],
            },
            {
                component: '../views/404',
            },
        ],
    },
];
