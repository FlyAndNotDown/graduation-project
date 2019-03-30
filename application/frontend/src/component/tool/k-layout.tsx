import * as React from 'react';
import { Layout } from 'antd';
import { Style, CssTool } from '../../tool/css';

export enum ColorMode { None, Main }
export enum WidthMode { Normal, Full }
interface Props extends React.Props<any> {
    colorMode?: ColorMode,
    widthMode?: WidthMode,
    fixedWidth?: string,
    className?: string,
    style?: Style,
    [propName: string]: any
}

export class KLayout extends React.Component<Props> {
    private static readonly combedClassNameWhenColorModeIsNone: string = 'bg-color-none';
    private static readonly combedClassNameWhenColorModeIsMain: string = 'bg-color-main';
    private static readonly combedClassNameWhenWidthModeIsFull: string = 'w-100';

    static defaultProps: Props = {
        colorMode: ColorMode.None,
        widthMode: WidthMode.Full,
        fixedWidth: '1440px'
    };

    private className: string = '';
    private style: Style = {};

    constructor(props: Props) {
        super(props);

        // ready new className and style object
        switch (this.props.colorMode) {
            default:
            case ColorMode.None:
                this.className = CssTool.combClassName(this.className, KLayout.combedClassNameWhenColorModeIsNone);
                break;
            case ColorMode.Main:
                this.className = CssTool.combClassName(this.className, KLayout.combedClassNameWhenColorModeIsMain);
                break;
        }
        switch (this.props.widthMode) {
            default:
            case WidthMode.Normal:
                break;
            case WidthMode.Full:
                this.className = CssTool.combClassName(this.className, KLayout.combedClassNameWhenWidthModeIsFull);
                break;
        }
    }

    render(): any {
        return (
            <Layout
                className={this.props.className ? CssTool.combClassName(this.className, this.props.className) : this.className}
                style={this.props.style ? CssTool.combStyle(this.style, this.props.style) : this.style}>
                {this.props.children}
            </Layout>
        );
    }
}