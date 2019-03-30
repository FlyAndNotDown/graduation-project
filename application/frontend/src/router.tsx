import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IndexPage } from './page/index';

interface Props {}

export class MainRouter extends React.Component {
    constructor(props: Props) {
        super(props);
    }

    render(): any {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={IndexPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}