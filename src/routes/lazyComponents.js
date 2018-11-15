import React, { Component } from 'react';
import Loader from '../components/CustLoader/index';


export const Home = Loader(() => {
    return import('../views/homePage/index');
});


