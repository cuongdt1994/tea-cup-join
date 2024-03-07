import { Cmd, Dispatcher, Sub, Task, Maybe } from 'tea-cup-core';
import * as React from 'react';
import { Component, ReactNode } from 'react';
import { DevTools } from './DevTools';
/**
 * Props for the ProgramWithNav.
 */
export interface NavProps<Model, Msg> {
    readonly onUrlChange: (l: Location) => Msg;
    readonly init: (l: Location) => [Model, Cmd<Msg>];
    readonly view: (dispatch: Dispatcher<Msg>, m: Model) => ReactNode;
    readonly update: (msg: Msg, model: Model) => [Model, Cmd<Msg>];
    readonly subscriptions: (model: Model) => Sub<Msg>;
    readonly devTools?: DevTools<Model, Msg>;
}
/**
 * Program that handles navigation (routing).
 */
export declare class ProgramWithNav<Model, Msg> extends Component<NavProps<Model, Msg>, never> {
    private listener;
    private readonly ref;
    constructor(props: Readonly<NavProps<Model, Msg>>);
    render(): React.ReactNode;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
/**
 * Return a Task that will eventually change the browser location via historty.pushState,
 * and send back a Msg into the Program
 * @param url the url to navigate to
 */
export declare function newUrl(url: string): Task<never, Location>;
export declare abstract class PathElem<T> {
    abstract mapPart(part: string): Maybe<T>;
}
export declare function str(s?: string): PathElem<string>;
export declare function int(): PathElem<number>;
export declare function regex<T>(r: RegExp, converter: (s: string) => Maybe<T>): PathElem<T>;
export declare class Path0 {
    map<R>(f: (query: QueryParams) => R): RouteDef<R>;
}
export declare class QueryParams {
    private readonly store;
    private readonly hash;
    private constructor();
    getValues(name: string): Maybe<ReadonlyArray<string>>;
    getValue(name: string): Maybe<string>;
    getHash(): Maybe<string>;
    static empty(): QueryParams;
    static fromQueryStringAndHash(queryString?: string, hash?: string): QueryParams;
}
export declare class Path1<T> {
    readonly e: PathElem<T>;
    constructor(e: PathElem<T>);
    map<R>(f: (t: T, query: QueryParams) => R): RouteDef<R>;
}
export declare class Path2<T1, T2> {
    readonly e1: PathElem<T1>;
    readonly e2: PathElem<T2>;
    constructor(e1: PathElem<T1>, e2: PathElem<T2>);
    map<R>(f: (t1: T1, t2: T2, query: QueryParams) => R): RouteDef<R>;
}
export declare class Path3<T1, T2, T3> {
    readonly e1: PathElem<T1>;
    readonly e2: PathElem<T2>;
    readonly e3: PathElem<T3>;
    constructor(e1: PathElem<T1>, e2: PathElem<T2>, e3: PathElem<T3>);
    map<R>(f: (t1: T1, t2: T2, t3: T3, query: QueryParams) => R): RouteDef<R>;
}
export declare const route0: Path0;
export declare function route1<E>(e: PathElem<E>): Path1<E>;
export declare function route2<E1, E2, R>(e1: PathElem<E1>, e2: PathElem<E2>): Path2<E1, E2>;
export declare function route3<E1, E2, E3, R>(e1: PathElem<E1>, e2: PathElem<E2>, e3: PathElem<E3>): Path3<E1, E2, E3>;
export interface RouteBase<R> {
    checkRoute(pathname: string, query: QueryParams): Maybe<R>;
}
export declare class RouteDef<R> implements RouteBase<R> {
    readonly pathElems: ReadonlyArray<PathElem<any>>;
    readonly f: Function;
    constructor(pathElems: ReadonlyArray<PathElem<any>>, f: Function);
    static sanitizePath(path: string): string;
    static splitPath(path: string): ReadonlyArray<string>;
    checkRoute(pathname: string, query: QueryParams): Maybe<R>;
}
export declare class Router<R> {
    readonly routes: ReadonlyArray<RouteBase<R>>;
    constructor(...routeDefs: RouteBase<R>[]);
    parse(pathname: string, query: QueryParams): Maybe<R>;
    parseLocation(location: Location): Maybe<R>;
}
