import * as React from 'react';
import { Button, Layout, Row, Col, Avatar, Drawer, Steps, Upload, Icon } from 'antd';
import headerImage from '../img/header.jpg';
import { config } from '../config';

const { Step } = Steps;

interface Props {}
interface State {
    markDrawerVisible: boolean,
    restoreDrawerVisible: boolean
}

export class IndexPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            markDrawerVisible: false,
            restoreDrawerVisible: false
        };
    }

    showMarkDrawer = (): void => { this.setState({ markDrawerVisible: true }); };
    closeMarkDrawer = (): void => { this.setState({ markDrawerVisible: false }); };
    showRestoreDrawer = (): void => { this.setState({ restoreDrawerVisible: true }); };
    closeRestoreDrawer = (): void => { this.setState({ restoreDrawerVisible: false }); };
    onMarkButtonClick = (): void => { this.showMarkDrawer(); };
    onRestoreButtonClick = (): void => { this.showRestoreDrawer(); };

    render(): any {
        const titleRow = (
            <div className={'font-size-30px color-font-primary text-align-center'}>
                <span role={'img'} aria-labelledby={'package'}>📦</span> 彩图数字水印系统
            </div>
        );
        const secondTitleRow = (
            <div className={'font-size-15px color-font-second text-align-center'}>Quaternion Transform Based</div>
        );
        const buttonRow = (
            <div className={'mt-xxl'}>
                <div className={'text-align-center'}>
                    <Button
                        type={'primary'}
                        className={'w-80'}
                        shape={'round'}
                        icon={'highlight'}
                        onClick={this.onMarkButtonClick}>
                        嵌入水印
                    </Button>
                </div>
                <div className={'mt-lg text-align-center'}>
                    <Button
                        className={'w-80'}
                        shape={'round'}
                        icon={'zoom-in'}
                        onClick={this.onRestoreButtonClick}>
                        提取水印
                    </Button>
                </div>
            </div>
        );
        const aboutRow = (
            <div className={'font-size-13px mb-150px color-font-second mt-xxl text-align-center'}>
                <Avatar src={headerImage}/> &nbsp;
                Powered by
                <a className={'color-font-second'} href={'https://github.com/FlyAndNotDown'} target={'__blank'}>
                    <span role={'img'} aria-labelledby={'star'}>✨</span> John Kindem
                </a>
            </div>
        );
        
        const markDrawerSteps = (
            <div className={'mt-xxl'}>
                <Steps current={0} size={'small'}>
                    <Step title={'上传源文件'}/>
                    <Step title={'嵌入水印'}/>
                    <Step title={'保存结果'}/>
                </Steps>
            </div>
        );
        const markDrawerUploadSourceRow = (
            <Row className={'mt-60px'}>
                <Col span={12} offset={6}>
                    <div className={'text-align-center'}>
                        <Upload
                            name={'mark-source'}
                            action={`${config.urlPrefix}/file/upload`}>
                            <Button>
                                <Icon type={'upload'}/>&nbsp;
                                上传文件
                            </Button>
                        </Upload>
                    </div>
                </Col>
            </Row>
        );
        const markDrawer = (
            <Drawer
                title={'嵌入水印'}
                height={'80%'}
                onClose={this.closeMarkDrawer}
                visible={this.state.markDrawerVisible}
                placement={'bottom'}>
                <Row
                    type={'flex'}
                    justify={'center'}
                    align={'middle'}
                    className={'w-100 h-100'}>
                    <Col span={12}>
                        {markDrawerSteps}
                        {markDrawerUploadSourceRow}
                    </Col>
                </Row>
            </Drawer>
        );
        const restoreDrawer = (
            <Drawer
                title={'提取水印'}
                height={'80%'}
                onClose={this.closeRestoreDrawer}
                visible={this.state.restoreDrawerVisible}
                placement={'bottom'}>
            </Drawer>
        );

        return (
            <Layout className={'w-100 h-100 bg-color-main'}>
                <Row
                    type={'flex'}
                    justify={'center'}
                    align={'middle'}
                    className={'w-100 h-100 bg-color-main'}>
                    <Col>
                        {titleRow}
                        {secondTitleRow}
                        {buttonRow}
                        {aboutRow}
                    </Col>
                </Row>
                {markDrawer}
                {restoreDrawer}
            </Layout>
        );
    }
}