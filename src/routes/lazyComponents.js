import React, { Component } from 'react';
import Loader from '../views/componentsLoader/index';
import { homedir } from 'os';

export const Home = {
    componsnet: Loader(() => {
        import '../views/homePage/index';
    }),

}


