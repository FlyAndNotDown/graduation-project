import * as React from 'react';
import * as ReactDom from 'react-dom';
import { MainRouter } from './router';
import './css/css';

ReactDom.render(
    <MainRouter/>,
    document.getElementById('root')
);