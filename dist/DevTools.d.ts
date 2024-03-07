import { Cmd, ObjectSerializer } from 'tea-cup-core';
import { Program } from './Program';
export interface HasTime {
    readonly time: number;
}
interface HasTag {
    readonly tag: string;
}
export declare type DevToolsEvent<Model, Msg> = Init<Model, Msg> | Updated<Model, Msg>;
export interface Init<Model, Msg> extends HasTime, HasTag {
    readonly tag: 'init';
    readonly model: Model;
}
export interface Updated<Model, Msg> extends HasTime, HasTag {
    readonly tag: 'updated';
    readonly msgNum: number;
    readonly msg: Msg;
    readonly modelBefore: Model;
    readonly modelAfter: Model;
    readonly cmd: Cmd<Msg>;
}
export declare type DevToolsListener<Model, Msg> = (e: DevToolsEvent<Model, Msg>) => void;
export declare class DevTools<Model, Msg> {
    private program?;
    private events;
    private pausedOnEvent;
    private listeners;
    private objectSerializer;
    private maxEvents;
    constructor(objectSerializer: ObjectSerializer);
    static init<Model, Msg>(window: Window, objectSerializer?: ObjectSerializer): DevTools<Model, Msg>;
    isPaused(): boolean;
    connected(program: Program<Model, Msg>): void;
    onEvent(e: DevToolsEvent<Model, Msg>): void;
    travelTo(evtNum: number): void;
    private getEventModel;
    resume(): void;
    forward(): void;
    backward(): void;
    addListener(l: DevToolsListener<Model, Msg>): void;
    removeListener(l: DevToolsListener<Model, Msg>): void;
    lastEvent(): DevToolsEvent<Model, Msg>;
    lastModel(): Model;
    snapshot(): void;
    initFromSnapshot(): [Model, Cmd<Msg>] | undefined;
    clearSnapshot(): void;
    clear(): void;
    setMaxEvents(maxEvents: number): DevTools<Model, Msg>;
    private removeEventsIfNeeded;
}
export {};
