import * as React from 'react';

interface Props {};
interface State {};

export class IndexPage extends React.Component {
    state: State = {};

    constructor(props: Props) {
        super(props);
    }

    render(): any {
        return (
            <div>Hello, World</div>
        );
    };
}