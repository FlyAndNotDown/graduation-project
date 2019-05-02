import * as React from 'react';
import { Button, Layout, Row, Col, Avatar } from 'antd';
import headerImage from '../img/header.jpg';

interface Props {}

export class IndexPage extends React.Component {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): any {
        return (
            <Layout className={'w-100 h-100 bg-color-main'}>
                <Row
                    type={'flex'}
                    justify={'center'}
                    align={'middle'}
                    className={'w-100 h-100 bg-color-main'}>
                    <Col>
                        <div className={'font-size-30px color-font-primary text-align-center'}>
                            <span role={'img'} aria-labelledby={'package'}>📦</span> 彩图数字水印系统
                        </div>
                        <div className={'font-size-15px color-font-second text-align-center'}>Quaternion Transform Based</div>
                        <div className={'mt-xxl'}>
                            <div className={'text-align-center'}>
                                <Button
                                    type={'primary'}
                                    className={'w-80'}
                                    shape={'round'}
                                    icon={'highlight'}>
                                    嵌入水印
                                </Button>
                            </div>
                            <div className={'mt-lg text-align-center'}>
                                <Button
                                    className={'w-80'}
                                    shape={'round'}
                                    icon={'zoom-in'}>
                                    提取水印
                                </Button>
                            </div>
                        </div>
                        <div className={'font-size-13px mb-150px color-font-second mt-xxl text-align-center'}>
                            <Avatar src={headerImage}/> &nbsp;
                            Powered by
                            <a className={'color-font-second'} href={'https://github.com/FlyAndNotDown'} target={'__blank'}>
                                <span role={'img'} aria-labelledby={'star'}>✨</span> John Kindem
                            </a>
                        </div>
                    </Col>
                </Row>
            </Layout>
        );
    }
}