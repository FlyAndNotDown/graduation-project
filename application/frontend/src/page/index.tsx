import * as React from 'react';
import { Button, Row, Col } from 'antd';

interface Props extends React.Props<any> {}
interface State {}

export class IndexPage extends React.Component<Props> {
    state: State = {};

    constructor(props: Props) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </div>
        );
    };
}