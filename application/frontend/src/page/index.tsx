import * as React from 'react';
import { Button } from 'antd';

interface Props {};
interface State {};

export class IndexPage extends React.Component {
    state: State = {};

    constructor(props: Props) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <Button>Hello</Button>
            </div>
        );
    };
}