import * as React from 'react';
import { Button, Layout, Row, Col, Avatar, Drawer, Steps, Upload, Icon, Form, Input, Select, message } from 'antd';
import headerImage from '../img/header.jpg';
import { config } from '../config';
import Axios from 'axios';

const { Step } = Steps;

interface Props {}
interface UploadedFile {
    name: string,
    value: string
}
interface State {
    markDrawerVisible: boolean,
    restoreDrawerVisible: boolean,
    markDrawerStep: number,
    restoreDrawerStep: number,
    markFiles: UploadedFile[],
    markAlgorithm: string,
    markSource: string,
    markSecret: string,
    locked: boolean
}

export class IndexPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            markDrawerVisible: false,
            restoreDrawerVisible: false,
            markDrawerStep: 0,
            restoreDrawerStep: 0,

            markFiles: [],
            markAlgorithm: 'qdfrnt',
            markSource: '',
            markSecret: '',

            locked: false
        };
    }

    showMarkDrawer = (): void => { this.setState({ markDrawerVisible: true }); };
    closeMarkDrawer = (): void => { this.setState({ markDrawerVisible: false }); };
    showRestoreDrawer = (): void => { this.setState({ restoreDrawerVisible: true }); };
    closeRestoreDrawer = (): void => { this.setState({ restoreDrawerVisible: false }); };
    onMarkButtonClick = (): void => { this.showMarkDrawer(); };
    onRestoreButtonClick = (): void => { this.showRestoreDrawer(); };
    goNextMarkStep = (): void => { this.setState((prevState: State) => ({ markDrawerStep: prevState.markDrawerStep + 1 })); };
    goPrevMarkStep = (): void => { this.setState((prevState: State) => ({ markDrawerStep: prevState.markDrawerStep - 1 })); };
    goNextRestoreStep = (): void => { this.setState((prevState: State) => ({ restoreDrawerStep: prevState.restoreDrawerStep + 1 })); };
    goPrevRestoreStep = (): void => { this.setState((prevState: State) => ({ restoreDrawerStep: prevState.restoreDrawerStep - 1 })); };
    lock = (): void => { this.setState({ locked: true }); };
    unlock = (): void => { this.setState({ locked: false }); };
    onMarkUploadChange = (info: any): void => {
        if (info.file.status === 'done') {
            this.setState((prevState: State) => {
                const newMarkFiles: UploadedFile[] = [];
                for (let i: number = 0; i < prevState.markFiles.length; i++) {
                    newMarkFiles.push(prevState.markFiles[i]);
                }
                const file: UploadedFile = {
                    name: info.file.name,
                    value: info.file.response.name
                };
                newMarkFiles.push(file);
                return {
                    markFiles: newMarkFiles
                };
            });
        }
    };
    onMarkUploadRemove = (file: any) => {
        this.setState((prevState: State) => {
            const newMarkFiles: UploadedFile[] = [];
            for (let i: number = 0; i < prevState.markFiles.length; i++) {
                if (prevState.markFiles[i].name !== file.name) {
                    newMarkFiles.push(prevState.markFiles[i]);
                }
            }
            return {
                markFiles: newMarkFiles
            };
        });
    }
    onMarkAlgorithmChange = (value: string) => { this.setState({ markAlgorithm: value }); };
    onMarkSourceChange = (value: string) => { this.setState({ markSource: value }); };
    onMarkSecretChange = (value: string) => { this.setState({ markSecret: value }); };
    onMarkStartMarkButtonClicked = () => {
        if (this.state.markAlgorithm === '') {
            return message.error('请选择算法');
        }
        if (this.state.markSource === '') {
            return message.error('请选择原图');
        }
        if (this.state.markSecret === '') {
            return message.error('请选择水印图像');
        }
        this.lock();
        try {
            const response = Axios.post(config.urlPrefix, {
                algorithm: this.state.markAlgorithm,
                source: this.state.markSource,
                secret: this.state.markSecret
            });
        } catch (e) {
            this.unlock();
            return message.error('服务器错误，请重试');
        }
        // TODO
        this.unlock();
    };

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
                <Steps current={this.state.markDrawerStep} size={'small'}>
                    <Step title={'上传源文件'}/>
                    <Step title={'嵌入水印'}/>
                    <Step title={'保存结果'}/>
                </Steps>
            </div>
        );
        const markDrawerUploadSourceRow = (
            <Row className={'mt-60px'}>
                <Col span={8} offset={8}>
                    <div className={'text-align-center'}>
                        <Upload
                            name={'file'}
                            onChange={this.onMarkUploadChange}
                            onRemove={this.onMarkUploadRemove}
                            action={`${config.urlPrefix}/file/upload`}>
                            <Button>
                                <Icon type={'upload'}/>&nbsp;
                                上传文件
                            </Button>
                        </Upload>
                    </div>
                    <div className={'text-align-center mt-lg'}>
                        <Button type={'primary'} onClick={this.goNextMarkStep}>
                            <Icon type={'next'}/> 上传完毕，下一步
                        </Button>
                    </div>
                </Col>
            </Row>
        );
        const markDrawerMarkReadyRow = (
            <Row className={'mt-60px'}>
                <Col span={8} offset={8}>
                    <Form>
                        <Form.Item label={'变换算法'}>
                            <Select defaultValue={'qdfrnt'} onChange={this.onMarkAlgorithmChange}>
                                <Select.Option value={'qdfrnt'}>QDFRNT</Select.Option>
                                <Select.Option value={'qdfrft'}>QDFrFT</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={'选择要加水印的图片 (512x512)'}>
                            <Select onChange={this.onMarkSourceChange}>
                                {this.state.markFiles.map((file: UploadedFile): any => {
                                    return (<Select.Option value={file.value}>{file.name}</Select.Option>);
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label={'选择水印图片 (64x64)'}>
                            <Select onChange={this.onMarkSecretChange}>
                                {this.state.markFiles.map((file: UploadedFile): any => {
                                    return (<Select.Option value={file.value}>{file.name}</Select.Option>);
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={this.state.locked} className={'w-45 float-left'} onClick={this.goPrevMarkStep}>
                                返回上一步
                            </Button>
                            <Button disabled={this.state.locked} className={'w-45 float-right'} type={'primary'} onClick={this.onMarkStartMarkButtonClicked}>
                                开始嵌入
                            </Button>
                        </Form.Item>
                    </Form>
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
                        {this.state.markDrawerStep === 0 && markDrawerUploadSourceRow}
                        {this.state.markDrawerStep === 1 && markDrawerMarkReadyRow}
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