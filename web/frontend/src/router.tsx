import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { IndexPage } from './page';

interface Props {}

export class MainRouter extends React.Component {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): any {
        return (
            <HashRouter>
                <Switch>
                    <Route component={IndexPage} exact path={'/'}/>
                </Switch>
            </HashRouter>
        );
    }
}