import * as React from 'react';
import { Button, Row, Col, Select } from 'antd';
import { KLayout, ColorMode, WidthMode } from '../component/tool/k-layout';

interface Props extends React.Props<any> {
    history: Object
}
interface State {}

export class IndexPage extends React.Component<Props> {
    state: State = {};

    constructor(props: Props) {
        super(props);
    }

    render(): any {
        return (
            <KLayout
                colorMode={ColorMode.Main}
                widthMode={WidthMode.Full}>
                <Row
                    className='h-100vh'
                    type={'flex'}
                    align={'middle'}>
                    <Col
                        xs={{ span: 16, offset: 4 }}
                        sm={{ span: 16, offset: 4 }}
                        md={{ span: 12, offset: 6 }}
                        lg={{ span: 8, offset: 8 }}
                        xl={{ span: 4, offset: 10 }}
                        xxl={{ span: 4, offset: 10 }}>
                        <div className='w-100 font-size-lg color-black text-align-center'>✨水印系统</div>
                        <div className='w-100 text-align-center mt-xl'>
                            <Select
                                className='w-100'
                                placeholder='选择一种水印算法以开始'>
                                <Select.Option key={'qdfrnt'}>四元数随机变换水印算法</Select.Option>
                                <Select.Option key={'qdfrft'}>四元数傅里叶变换水印算法</Select.Option>
                            </Select>
                        </div>
                        <div className='w-100 text-align-center mt-md'>
                            <Button className={'w-45 float-left'} type='primary' href={'#'}>开始</Button>
                            <Button className={'w-45 float-right'} href={'#'}>关于</Button>
                        </div>
                    </Col>
                </Row>
            </KLayout>
        );
    };
}