import * as React from 'react';
/**
 * Memoize the view for passed data.
 * @param t the data to memoize.
 * @param compareFn optional comparison function. Defaults to ref equality
 */
export declare function memo<T>(t: T, compareFn?: (o1: T, o2: T) => boolean): (f: (t: T) => React.ReactNode) => React.CElement<MemoProps, Memo<unknown>>;
interface MemoProps {
    value: any;
    renderer: (x: any) => React.ReactNode;
    compareFn: (o1: any, o2: any) => boolean;
}
declare class Memo<T> extends React.Component<MemoProps> {
    render(): React.ReactNode;
    shouldComponentUpdate(nextProps: Readonly<MemoProps>, nextState: Readonly<{}>, nextContext: any): boolean;
}
export {};
