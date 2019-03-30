import * as React from 'react';
import * as ReactDom from 'react-dom';
import { MainRouter } from './router';

ReactDom.render(
    <MainRouter/>,
    document.getElementById('root')
);