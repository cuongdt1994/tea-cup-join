/// <reference types="jest" />
import { Dispatcher, Cmd } from 'tea-cup-core';
import { ReactElement } from 'react';
import { ProgramProps } from '.';
export declare function extendJest<M>(expect: jest.Expect): void;
declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveDispatchedMsg<M>(value: M): CustomMatcherResult;
        }
    }
}
export declare class Testing<M> {
    private _dispatched;
    Testing(): void;
    readonly noop: Dispatcher<M>;
    get dispatcher(): Dispatcher<M>;
    get dispatched(): M | undefined;
    dispatchFrom(cmd: Cmd<M>): Promise<M>;
}
declare type Trigger<Model, Msg, T> = (node: ReactElement<ProgramProps<Model, Msg>>) => T;
export declare function updateUntilIdle<Model, Msg, T>(props: ProgramProps<Model, Msg>, fun: Trigger<Model, Msg, T>): Promise<[Model, T]>;
export {};
