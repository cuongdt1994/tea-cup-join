import { Sub } from 'tea-cup-core';
declare abstract class EventMapEvents<Map, Msg> {
    abstract doAddListener<K extends keyof Map>(key: K, listener: (ev: Map[K]) => any, options?: boolean | AddEventListenerOptions): void;
    abstract doRemoveListener<K extends keyof Map>(key: K, listener: (ev: Map[K]) => any, options?: boolean | AddEventListenerOptions): void;
    /**
     * Subscribe to an event.
     * @param key the event type to subscribe to.
     * @param mapper map the event to a message.
     * @param options options for this listener
     */
    on<K extends keyof Map, Msg>(key: K, mapper: (e: Map[K]) => Msg, options?: boolean | AddEventListenerOptions): Sub<Msg>;
}
/**
 * Subscribe to document events.
 */
export declare class DocumentEvents<Msg> extends EventMapEvents<DocumentEventMap, Msg> {
    doAddListener<K extends keyof DocumentEventMap>(key: K, listener: (ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    doRemoveListener<K extends keyof DocumentEventMap>(key: K, listener: (ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
}
/**
 * Bonus, WindowEvents
 */
export declare class WindowEvents<Msg> extends EventMapEvents<WindowEventMap, Msg> {
    doAddListener<K extends keyof WindowEventMap>(key: K, listener: (ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    doRemoveListener<K extends keyof WindowEventMap>(key: K, listener: (ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
}
export {};
