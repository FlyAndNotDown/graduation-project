import * as React from 'react';
import { Layout } from 'antd';

export enum ColorMode { None, Main }
export enum WidthMode { Normal, Full, Fixed }
interface Props {
    colorMode?: ColorMode,
    widthMode?: WidthMode,
    fixedWidth?: string,
    [propName: string]: any
}

export class KLayout extends React.Component {
    static defaultProps: Props = {
        colorMode: ColorMode.None,
        widthMode: WidthMode.Full,
        fixedWidth: '1440px'
    };

    constructor(props: Props) {
        super(props);
    }

    render(): any {}
}