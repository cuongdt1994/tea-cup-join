import { Component, ReactNode } from 'react';
import { Dispatcher, Cmd, Sub } from 'tea-cup-core';
import { DevTools } from './DevTools';
/**
 * The program props : asks for init, view, update and subs in order
 * to start the TEA MVU loop.
 */
export interface ProgramProps<Model, Msg> {
    init: () => [Model, Cmd<Msg>];
    view: (dispatch: Dispatcher<Msg>, model: Model) => ReactNode;
    update: (msg: Msg, model: Model) => [Model, Cmd<Msg>];
    subscriptions: (model: Model) => Sub<Msg>;
    devTools?: DevTools<Model, Msg>;
}
/**
 * A React component that holds a TEA "program", provides the Dispatcher, and implements the MVU loop.
 */
export declare class Program<Model, Msg> extends Component<ProgramProps<Model, Msg>, never> {
    readonly uuid: string;
    private readonly bd;
    private count;
    private initialCmd?;
    private currentModel?;
    private currentSub?;
    constructor(props: Readonly<ProgramProps<Model, Msg>>);
    private fireEvent;
    dispatch(msg: Msg): void;
    componentWillUnmount(): void;
    componentDidMount(): void;
    render(): ReactNode;
    setModel(model: Model, withSubs: boolean): void;
}
