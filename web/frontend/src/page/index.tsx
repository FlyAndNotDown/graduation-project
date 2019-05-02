import * as React from 'react';
import { Button } from 'antd';

interface Props {}

export class IndexPage extends React.Component {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): any {
        return (
            <div>
                <Button type={'primary'}>
                    Test Button
                </Button>
            </div>
        );
    }
}