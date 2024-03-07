"use strict";
/*
 * MIT License
 *
 * Copyright (c) 2019 Rémi Van Keisbelck
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevTools = void 0;
const tea_cup_core_1 = require("tea-cup-core");
const snapshotKey = 'teaCupSnapshot';
class DevTools {
    constructor(objectSerializer) {
        this.events = [];
        this.pausedOnEvent = -1;
        this.listeners = [];
        this.maxEvents = -1;
        this.objectSerializer = objectSerializer;
    }
    static init(window, objectSerializer) {
        const dt = new DevTools(objectSerializer || tea_cup_core_1.ObjectSerializer.withTeaCupClasses());
        // @ts-ignore
        window['teaCupDevTools'] = dt;
        return dt;
    }
    isPaused() {
        return this.pausedOnEvent !== -1;
    }
    connected(program) {
        this.program = program;
    }
    onEvent(e) {
        this.events.push(e);
        this.removeEventsIfNeeded();
        this.listeners.forEach((l) => l(e));
    }
    travelTo(evtNum) {
        if (this.program) {
            const evt = this.events[evtNum];
            if (evt) {
                const model = this.getEventModel(evt);
                this.pausedOnEvent = evtNum;
                this.program.setModel(model, false);
            }
        }
    }
    getEventModel(e) {
        switch (e.tag) {
            case 'init':
                return e.model;
            case 'updated':
                return e.modelAfter;
        }
    }
    resume() {
        if (this.program) {
            if (this.events.length > 0) {
                const lastEvent = this.events[this.events.length - 1];
                if (lastEvent) {
                    const model = this.getEventModel(lastEvent);
                    this.pausedOnEvent = -1;
                    this.program.setModel(model, true);
                }
            }
        }
    }
    forward() {
        if (this.pausedOnEvent >= 0 && this.pausedOnEvent < this.events.length - 1) {
            this.travelTo(this.pausedOnEvent + 1);
        }
    }
    backward() {
        if (this.pausedOnEvent >= 1) {
            this.travelTo(this.pausedOnEvent - 1);
        }
    }
    addListener(l) {
        this.listeners.push(l);
    }
    removeListener(l) {
        this.listeners = this.listeners.filter((x) => x !== l);
    }
    lastEvent() {
        return this.events[this.events.length - 1];
    }
    lastModel() {
        const e = this.lastEvent();
        switch (e.tag) {
            case 'init': {
                return e.model;
            }
            case 'updated': {
                return e.modelAfter;
            }
        }
    }
    snapshot() {
        localStorage.setItem(snapshotKey, this.objectSerializer.serialize(this.lastModel()));
        console.log('********************************************************************\n' +
            '*** The current application state has been saved to local storage.\n' +
            '*** The application will now load with this initial state.\n' +
            "*** Call 'teaCupDevTools.clearSnapshot()' to restore normal loading.\n" +
            '********************************************************************');
    }
    initFromSnapshot() {
        const json = localStorage.getItem(snapshotKey);
        if (json) {
            try {
                // @ts-ignore
                const model = this.objectSerializer.deserialize(json);
                console.log('**********************************************************************************************\n' +
                    "*** The application has initialized from a state saved by calling 'teaCupDevTools.snapshot()'.\n" +
                    "*** Call 'teaCupDevTools.clearSnapshot()' if you want to restore normal loading.\n" +
                    '**********************************************************************************************');
                return tea_cup_core_1.noCmd(model);
            }
            catch (e) {
                console.log('*** Error restoring state from local storage: ', e);
            }
        }
    }
    clearSnapshot() {
        localStorage.removeItem(snapshotKey);
        console.log('***********************************************************************\n' +
            '*** Application state cleared, the application will now start normally.\n' +
            '***********************************************************************');
    }
    clear() {
        if (this.isPaused()) {
            this.resume();
        }
        this.events = [];
        console.log('All events cleared');
    }
    setMaxEvents(maxEvents) {
        this.maxEvents = maxEvents;
        this.removeEventsIfNeeded();
        return this;
    }
    removeEventsIfNeeded() {
        if (this.maxEvents > 0) {
            const delta = this.events.length - this.maxEvents;
            if (delta > 0) {
                const newEvents = this.events.slice(delta, this.events.length);
                this.events = newEvents;
            }
        }
        return this;
    }
}
exports.DevTools = DevTools;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV2VG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVGVhQ3VwL0RldlRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7OztBQUVILCtDQUE0RDtBQTJCNUQsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7QUFJckMsTUFBYSxRQUFRO0lBUW5CLFlBQVksZ0JBQWtDO1FBTnRDLFdBQU0sR0FBZ0MsRUFBRSxDQUFDO1FBQ3pDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsY0FBUyxHQUFtQyxFQUFFLENBQUM7UUFFL0MsY0FBUyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBYSxNQUFjLEVBQUUsZ0JBQW1DO1FBQ3pFLE1BQU0sRUFBRSxHQUFHLElBQUksUUFBUSxDQUFhLGdCQUFnQixJQUFJLCtCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUM5RixhQUFhO1FBQ2IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUE0QjtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTyxDQUFDLENBQTRCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWM7UUFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE1BQU0sR0FBRyxHQUE4QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNELElBQUksR0FBRyxFQUFFO2dCQUNQLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDckM7U0FDRjtJQUNILENBQUM7SUFFTyxhQUFhLENBQUMsQ0FBNEI7UUFDaEQsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFO1lBQ2IsS0FBSyxNQUFNO2dCQUNULE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNqQixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksU0FBUyxFQUFFO29CQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLENBQStCO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxjQUFjLENBQUMsQ0FBK0I7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxTQUFTO1FBQ1AsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRTtZQUNiLEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQ1gsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsS0FBSyxTQUFTLENBQUMsQ0FBQztnQkFDZCxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUM7YUFDckI7U0FDRjtJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsd0VBQXdFO1lBQ3RFLHNFQUFzRTtZQUN0RSw4REFBOEQ7WUFDOUQsd0VBQXdFO1lBQ3hFLHNFQUFzRSxDQUN6RSxDQUFDO0lBQ0osQ0FBQztJQUVELGdCQUFnQjtRQUNkLE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJO2dCQUNGLGFBQWE7Z0JBQ2IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQVUsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FDVCxrR0FBa0c7b0JBQ2hHLGtHQUFrRztvQkFDbEcsb0ZBQW9GO29CQUNwRixnR0FBZ0csQ0FDbkcsQ0FBQztnQkFDRixPQUFPLG9CQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FDVCwyRUFBMkU7WUFDekUsMkVBQTJFO1lBQzNFLHlFQUF5RSxDQUM1RSxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsWUFBWSxDQUFDLFNBQWlCO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLG9CQUFvQjtRQUMxQixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQzthQUN6QjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFyS0QsNEJBcUtDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE5IFLDqW1pIFZhbiBLZWlzYmVsY2tcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBDbWQsIG5vQ21kLCBPYmplY3RTZXJpYWxpemVyIH0gZnJvbSAndGVhLWN1cC1jb3JlJztcbmltcG9ydCB7IFByb2dyYW0gfSBmcm9tICcuL1Byb2dyYW0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhhc1RpbWUge1xuICByZWFkb25seSB0aW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBIYXNUYWcge1xuICByZWFkb25seSB0YWc6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRGV2VG9vbHNFdmVudDxNb2RlbCwgTXNnPiA9IEluaXQ8TW9kZWwsIE1zZz4gfCBVcGRhdGVkPE1vZGVsLCBNc2c+O1xuXG5leHBvcnQgaW50ZXJmYWNlIEluaXQ8TW9kZWwsIE1zZz4gZXh0ZW5kcyBIYXNUaW1lLCBIYXNUYWcge1xuICByZWFkb25seSB0YWc6ICdpbml0JztcbiAgcmVhZG9ubHkgbW9kZWw6IE1vZGVsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZWQ8TW9kZWwsIE1zZz4gZXh0ZW5kcyBIYXNUaW1lLCBIYXNUYWcge1xuICByZWFkb25seSB0YWc6ICd1cGRhdGVkJztcbiAgcmVhZG9ubHkgbXNnTnVtOiBudW1iZXI7XG4gIHJlYWRvbmx5IG1zZzogTXNnO1xuICByZWFkb25seSBtb2RlbEJlZm9yZTogTW9kZWw7XG4gIHJlYWRvbmx5IG1vZGVsQWZ0ZXI6IE1vZGVsO1xuICByZWFkb25seSBjbWQ6IENtZDxNc2c+O1xufVxuXG5jb25zdCBzbmFwc2hvdEtleSA9ICd0ZWFDdXBTbmFwc2hvdCc7XG5cbmV4cG9ydCB0eXBlIERldlRvb2xzTGlzdGVuZXI8TW9kZWwsIE1zZz4gPSAoZTogRGV2VG9vbHNFdmVudDxNb2RlbCwgTXNnPikgPT4gdm9pZDtcblxuZXhwb3J0IGNsYXNzIERldlRvb2xzPE1vZGVsLCBNc2c+IHtcbiAgcHJpdmF0ZSBwcm9ncmFtPzogUHJvZ3JhbTxNb2RlbCwgTXNnPjtcbiAgcHJpdmF0ZSBldmVudHM6IERldlRvb2xzRXZlbnQ8TW9kZWwsIE1zZz5bXSA9IFtdO1xuICBwcml2YXRlIHBhdXNlZE9uRXZlbnQ6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIGxpc3RlbmVyczogRGV2VG9vbHNMaXN0ZW5lcjxNb2RlbCwgTXNnPltdID0gW107XG4gIHByaXZhdGUgb2JqZWN0U2VyaWFsaXplcjogT2JqZWN0U2VyaWFsaXplcjtcbiAgcHJpdmF0ZSBtYXhFdmVudHM6IG51bWJlciA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKG9iamVjdFNlcmlhbGl6ZXI6IE9iamVjdFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLm9iamVjdFNlcmlhbGl6ZXIgPSBvYmplY3RTZXJpYWxpemVyO1xuICB9XG5cbiAgc3RhdGljIGluaXQ8TW9kZWwsIE1zZz4od2luZG93OiBXaW5kb3csIG9iamVjdFNlcmlhbGl6ZXI/OiBPYmplY3RTZXJpYWxpemVyKTogRGV2VG9vbHM8TW9kZWwsIE1zZz4ge1xuICAgIGNvbnN0IGR0ID0gbmV3IERldlRvb2xzPE1vZGVsLCBNc2c+KG9iamVjdFNlcmlhbGl6ZXIgfHwgT2JqZWN0U2VyaWFsaXplci53aXRoVGVhQ3VwQ2xhc3NlcygpKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgd2luZG93Wyd0ZWFDdXBEZXZUb29scyddID0gZHQ7XG4gICAgcmV0dXJuIGR0O1xuICB9XG5cbiAgaXNQYXVzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkT25FdmVudCAhPT0gLTE7XG4gIH1cblxuICBjb25uZWN0ZWQocHJvZ3JhbTogUHJvZ3JhbTxNb2RlbCwgTXNnPikge1xuICAgIHRoaXMucHJvZ3JhbSA9IHByb2dyYW07XG4gIH1cblxuICBvbkV2ZW50KGU6IERldlRvb2xzRXZlbnQ8TW9kZWwsIE1zZz4pOiB2b2lkIHtcbiAgICB0aGlzLmV2ZW50cy5wdXNoKGUpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRzSWZOZWVkZWQoKTtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKChsKSA9PiBsKGUpKTtcbiAgfVxuXG4gIHRyYXZlbFRvKGV2dE51bTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucHJvZ3JhbSkge1xuICAgICAgY29uc3QgZXZ0OiBEZXZUb29sc0V2ZW50PE1vZGVsLCBNc2c+ID0gdGhpcy5ldmVudHNbZXZ0TnVtXTtcbiAgICAgIGlmIChldnQpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLmdldEV2ZW50TW9kZWwoZXZ0KTtcbiAgICAgICAgdGhpcy5wYXVzZWRPbkV2ZW50ID0gZXZ0TnVtO1xuICAgICAgICB0aGlzLnByb2dyYW0uc2V0TW9kZWwobW9kZWwsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEV2ZW50TW9kZWwoZTogRGV2VG9vbHNFdmVudDxNb2RlbCwgTXNnPik6IE1vZGVsIHtcbiAgICBzd2l0Y2ggKGUudGFnKSB7XG4gICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgcmV0dXJuIGUubW9kZWw7XG4gICAgICBjYXNlICd1cGRhdGVkJzpcbiAgICAgICAgcmV0dXJuIGUubW9kZWxBZnRlcjtcbiAgICB9XG4gIH1cblxuICByZXN1bWUoKSB7XG4gICAgaWYgKHRoaXMucHJvZ3JhbSkge1xuICAgICAgaWYgKHRoaXMuZXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbGFzdEV2ZW50ID0gdGhpcy5ldmVudHNbdGhpcy5ldmVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0RXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0RXZlbnRNb2RlbChsYXN0RXZlbnQpO1xuICAgICAgICAgIHRoaXMucGF1c2VkT25FdmVudCA9IC0xO1xuICAgICAgICAgIHRoaXMucHJvZ3JhbS5zZXRNb2RlbChtb2RlbCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3J3YXJkKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZE9uRXZlbnQgPj0gMCAmJiB0aGlzLnBhdXNlZE9uRXZlbnQgPCB0aGlzLmV2ZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICB0aGlzLnRyYXZlbFRvKHRoaXMucGF1c2VkT25FdmVudCArIDEpO1xuICAgIH1cbiAgfVxuXG4gIGJhY2t3YXJkKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZE9uRXZlbnQgPj0gMSkge1xuICAgICAgdGhpcy50cmF2ZWxUbyh0aGlzLnBhdXNlZE9uRXZlbnQgLSAxKTtcbiAgICB9XG4gIH1cblxuICBhZGRMaXN0ZW5lcihsOiBEZXZUb29sc0xpc3RlbmVyPE1vZGVsLCBNc2c+KTogdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsKTtcbiAgfVxuXG4gIHJlbW92ZUxpc3RlbmVyKGw6IERldlRvb2xzTGlzdGVuZXI8TW9kZWwsIE1zZz4pOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcigoeCkgPT4geCAhPT0gbCk7XG4gIH1cblxuICBsYXN0RXZlbnQoKTogRGV2VG9vbHNFdmVudDxNb2RlbCwgTXNnPiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzW3RoaXMuZXZlbnRzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgbGFzdE1vZGVsKCk6IE1vZGVsIHtcbiAgICBjb25zdCBlID0gdGhpcy5sYXN0RXZlbnQoKTtcbiAgICBzd2l0Y2ggKGUudGFnKSB7XG4gICAgICBjYXNlICdpbml0Jzoge1xuICAgICAgICByZXR1cm4gZS5tb2RlbDtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3VwZGF0ZWQnOiB7XG4gICAgICAgIHJldHVybiBlLm1vZGVsQWZ0ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc25hcHNob3QoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc25hcHNob3RLZXksIHRoaXMub2JqZWN0U2VyaWFsaXplci5zZXJpYWxpemUodGhpcy5sYXN0TW9kZWwoKSkpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXFxuJyArXG4gICAgICAgICcqKiogVGhlIGN1cnJlbnQgYXBwbGljYXRpb24gc3RhdGUgaGFzIGJlZW4gc2F2ZWQgdG8gbG9jYWwgc3RvcmFnZS5cXG4nICtcbiAgICAgICAgJyoqKiBUaGUgYXBwbGljYXRpb24gd2lsbCBub3cgbG9hZCB3aXRoIHRoaXMgaW5pdGlhbCBzdGF0ZS5cXG4nICtcbiAgICAgICAgXCIqKiogQ2FsbCAndGVhQ3VwRGV2VG9vbHMuY2xlYXJTbmFwc2hvdCgpJyB0byByZXN0b3JlIG5vcm1hbCBsb2FkaW5nLlxcblwiICtcbiAgICAgICAgJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyxcbiAgICApO1xuICB9XG5cbiAgaW5pdEZyb21TbmFwc2hvdCgpOiBbTW9kZWwsIENtZDxNc2c+XSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHNuYXBzaG90S2V5KTtcbiAgICBpZiAoanNvbikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMub2JqZWN0U2VyaWFsaXplci5kZXNlcmlhbGl6ZShqc29uKSBhcyBNb2RlbDtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcXG4nICtcbiAgICAgICAgICAgIFwiKioqIFRoZSBhcHBsaWNhdGlvbiBoYXMgaW5pdGlhbGl6ZWQgZnJvbSBhIHN0YXRlIHNhdmVkIGJ5IGNhbGxpbmcgJ3RlYUN1cERldlRvb2xzLnNuYXBzaG90KCknLlxcblwiICtcbiAgICAgICAgICAgIFwiKioqIENhbGwgJ3RlYUN1cERldlRvb2xzLmNsZWFyU25hcHNob3QoKScgaWYgeW91IHdhbnQgdG8gcmVzdG9yZSBub3JtYWwgbG9hZGluZy5cXG5cIiArXG4gICAgICAgICAgICAnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBub0NtZChtb2RlbCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcqKiogRXJyb3IgcmVzdG9yaW5nIHN0YXRlIGZyb20gbG9jYWwgc3RvcmFnZTogJywgZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYXJTbmFwc2hvdCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzbmFwc2hvdEtleSk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcXG4nICtcbiAgICAgICAgJyoqKiBBcHBsaWNhdGlvbiBzdGF0ZSBjbGVhcmVkLCB0aGUgYXBwbGljYXRpb24gd2lsbCBub3cgc3RhcnQgbm9ybWFsbHkuXFxuJyArXG4gICAgICAgICcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicsXG4gICAgKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLmlzUGF1c2VkKCkpIHtcbiAgICAgIHRoaXMucmVzdW1lKCk7XG4gICAgfVxuICAgIHRoaXMuZXZlbnRzID0gW107XG4gICAgY29uc29sZS5sb2coJ0FsbCBldmVudHMgY2xlYXJlZCcpO1xuICB9XG5cbiAgc2V0TWF4RXZlbnRzKG1heEV2ZW50czogbnVtYmVyKTogRGV2VG9vbHM8TW9kZWwsIE1zZz4ge1xuICAgIHRoaXMubWF4RXZlbnRzID0gbWF4RXZlbnRzO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRzSWZOZWVkZWQoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRXZlbnRzSWZOZWVkZWQoKTogRGV2VG9vbHM8TW9kZWwsIE1zZz4ge1xuICAgIGlmICh0aGlzLm1heEV2ZW50cyA+IDApIHtcbiAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5ldmVudHMubGVuZ3RoIC0gdGhpcy5tYXhFdmVudHM7XG4gICAgICBpZiAoZGVsdGEgPiAwKSB7XG4gICAgICAgIGNvbnN0IG5ld0V2ZW50cyA9IHRoaXMuZXZlbnRzLnNsaWNlKGRlbHRhLCB0aGlzLmV2ZW50cy5sZW5ndGgpO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ld0V2ZW50cztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdfQ==