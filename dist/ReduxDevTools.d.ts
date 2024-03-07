import { DevTools } from './DevTools';
interface ReduxMsg {
    type: string;
}
export interface ReduxDevToolsOptions {
    readonly teacupToReduxMessage: (msg: any) => ReduxMsg;
    readonly name?: string;
    readonly actionsCreators?: any;
    readonly latency?: number;
    readonly maxAge?: number;
    readonly trace?: boolean;
    readonly traceLimit?: number;
    readonly serialize?: boolean | {
        date?: boolean;
        regex?: boolean;
        undefined?: boolean;
        error?: boolean;
        symbol?: boolean;
        map?: boolean;
        set?: boolean;
        function?: boolean | Function;
    };
    actionSanitizer?(action: any, id: number): any;
    stateSanitizer?(state: any, index?: number): any;
    readonly actionsBlacklist?: string | string[];
    readonly actionsWhitelist?: string | string[];
    predicate?(state: any, action: any): boolean;
    readonly shouldRecordChanges?: boolean;
    readonly pauseActionType?: string;
    readonly autoPause?: boolean;
    readonly shouldStartLocked?: boolean;
    readonly shouldHotReload?: boolean;
    readonly shouldCatchErrors?: boolean;
    readonly features?: {
        readonly pause?: boolean;
        readonly lock?: boolean;
        readonly persist?: boolean;
        readonly export?: boolean | 'custom';
        readonly import?: boolean | 'custom';
        readonly jump?: boolean;
        readonly skip?: boolean;
        readonly reorder?: boolean;
        readonly dispatch?: boolean;
        readonly test?: boolean;
    };
}
export declare function withReduxDevTools<Model, Msg>(dt: DevTools<Model, Msg>, options?: ReduxDevToolsOptions): DevTools<Model, Msg>;
export {};
