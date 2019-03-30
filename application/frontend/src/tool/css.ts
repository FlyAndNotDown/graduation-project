export interface Style {
    [propName: string]: string
}

export class CssTool {
    static combClassName(defaultClassName: string, inputClassName: string): string {
        return inputClassName ? `${defaultClassName} ${inputClassName}` : defaultClassName
    }

    static combStyle(defaultStyle: Style, inputStyle: Style): Style {
        let style: Style = {};
        if (defaultStyle) {
            for (let key in defaultStyle) {
                if (<Object>defaultStyle.hasOwnProperty(key)) {
                    style[key] = defaultStyle[key];
                }
            }
        }
        if (inputStyle) {
            for (let key in inputStyle) {
                if (<Object>inputStyle.hasOwnProperty(key)) {
                    style[key] = inputStyle[key];
                }
            }
        }
        return style;
    }
}