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
exports.Program = void 0;
const react_1 = require("react");
const tea_cup_core_1 = require("tea-cup-core");
/**
 * A React component that holds a TEA "program", provides the Dispatcher, and implements the MVU loop.
 */
class Program extends react_1.Component {
    constructor(props) {
        super(props);
        this.uuid = tea_cup_core_1.nextUuid();
        this.count = 0;
        this.bd = this.dispatch.bind(this);
    }
    fireEvent(e) {
        if (this.props.devTools) {
            this.props.devTools.onEvent(e);
        }
    }
    dispatch(msg) {
        if (this.currentSub === undefined) {
            return;
        }
        if (this.props.devTools && this.props.devTools.isPaused()) {
            // do not process messages if we are paused
            return;
        }
        this.count++;
        const count = this.count;
        const currentModel = this.currentModel;
        if (currentModel !== undefined) {
            const updated = this.props.update(msg, currentModel);
            if (this.props.devTools) {
                this.fireEvent({
                    tag: 'updated',
                    msgNum: count,
                    time: new Date().getTime(),
                    msg: msg,
                    modelBefore: currentModel,
                    modelAfter: updated[0],
                    cmd: updated[1],
                });
            }
            const newSub = this.props.subscriptions(updated[0]);
            const prevSub = this.currentSub;
            const d = this.dispatch.bind(this);
            newSub.init(d);
            prevSub === null || prevSub === void 0 ? void 0 : prevSub.release();
            // perform commands in a separate timout, to
            // make sure that this dispatch is done
            const cmd = updated[1];
            if (!(cmd instanceof tea_cup_core_1.CmdNone)) {
                setTimeout(() => {
                    // console.log("dispatch: processing commands");
                    // debug("performing command", updated[1]);
                    updated[1].execute(d);
                    // debug("<<<  done");
                }, 0);
            }
            const needsUpdate = this.currentModel !== updated[0];
            this.currentModel = updated[0];
            this.currentSub = newSub;
            // trigger rendering
            if (needsUpdate) {
                this.forceUpdate();
            }
        }
    }
    componentWillUnmount() {
        var _a;
        (_a = this.currentSub) === null || _a === void 0 ? void 0 : _a.release();
        this.currentSub = undefined;
    }
    componentDidMount() {
        const { devTools } = this.props;
        if (devTools) {
            devTools.connected(this);
        }
        const mac = (devTools && devTools.initFromSnapshot()) || this.props.init();
        if (devTools) {
            this.fireEvent({
                tag: 'init',
                time: new Date().getTime(),
                model: mac[0],
            });
        }
        const sub = this.props.subscriptions(mac[0]);
        this.currentModel = mac[0];
        this.currentSub = sub;
        // connect to sub
        sub.init(this.bd);
        this.initialCmd = mac[1];
        // trigger initial command
        setTimeout(() => {
            this.initialCmd && this.initialCmd.execute(this.bd);
        }, 0);
        // trigger rendering after mount
        this.forceUpdate();
    }
    render() {
        if (this.currentModel !== undefined && this.bd) {
            return this.props.view(this.bd, this.currentModel);
        }
        return null;
    }
    setModel(model, withSubs) {
        if (this.bd) {
            let newSub;
            if (withSubs) {
                newSub = this.props.subscriptions(model);
            }
            else {
                newSub = tea_cup_core_1.Sub.none();
            }
            newSub.init(this.bd);
            this.currentSub && this.currentSub.release();
            this.currentModel = model;
            this.currentSub = newSub;
            this.forceUpdate();
        }
    }
}
exports.Program = Program;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9UZWFDdXAvUHJvZ3JhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHOzs7QUFFSCxpQ0FBNkM7QUFDN0MsK0NBQXVFO0FBZXZFOztHQUVHO0FBQ0gsTUFBYSxPQUFvQixTQUFRLGlCQUEwQztJQVFqRixZQUFZLEtBQXlDO1FBQ25ELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQVJOLFNBQUksR0FBRyx1QkFBUSxFQUFFLENBQUM7UUFFbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQU94QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyxTQUFTLENBQUMsQ0FBNEI7UUFDNUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVE7UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDekQsMkNBQTJDO1lBQzNDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDOUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFD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QUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0NBQ0Y7QUFwSUQsMEJBb0lDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE5IFLDqW1pIFZhbiBLZWlzYmVsY2tcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IERpc3BhdGNoZXIsIENtZCwgU3ViLCBuZXh0VXVpZCwgQ21kTm9uZSB9IGZyb20gJ3RlYS1jdXAtY29yZSc7XG5pbXBvcnQgeyBEZXZUb29sc0V2ZW50LCBEZXZUb29scyB9IGZyb20gJy4vRGV2VG9vbHMnO1xuXG4vKipcbiAqIFRoZSBwcm9ncmFtIHByb3BzIDogYXNrcyBmb3IgaW5pdCwgdmlldywgdXBkYXRlIGFuZCBzdWJzIGluIG9yZGVyXG4gKiB0byBzdGFydCB0aGUgVEVBIE1WVSBsb29wLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyYW1Qcm9wczxNb2RlbCwgTXNnPiB7XG4gIGluaXQ6ICgpID0+IFtNb2RlbCwgQ21kPE1zZz5dO1xuICB2aWV3OiAoZGlzcGF0Y2g6IERpc3BhdGNoZXI8TXNnPiwgbW9kZWw6IE1vZGVsKSA9PiBSZWFjdE5vZGU7XG4gIHVwZGF0ZTogKG1zZzogTXNnLCBtb2RlbDogTW9kZWwpID0+IFtNb2RlbCwgQ21kPE1zZz5dO1xuICBzdWJzY3JpcHRpb25zOiAobW9kZWw6IE1vZGVsKSA9PiBTdWI8TXNnPjtcbiAgZGV2VG9vbHM/OiBEZXZUb29sczxNb2RlbCwgTXNnPjtcbn1cblxuLyoqXG4gKiBBIFJlYWN0IGNvbXBvbmVudCB0aGF0IGhvbGRzIGEgVEVBIFwicHJvZ3JhbVwiLCBwcm92aWRlcyB0aGUgRGlzcGF0Y2hlciwgYW5kIGltcGxlbWVudHMgdGhlIE1WVSBsb29wLlxuICovXG5leHBvcnQgY2xhc3MgUHJvZ3JhbTxNb2RlbCwgTXNnPiBleHRlbmRzIENvbXBvbmVudDxQcm9ncmFtUHJvcHM8TW9kZWwsIE1zZz4sIG5ldmVyPiB7XG4gIHJlYWRvbmx5IHV1aWQgPSBuZXh0VXVpZCgpO1xuICBwcml2YXRlIHJlYWRvbmx5IGJkOiBEaXNwYXRjaGVyPE1zZz47XG4gIHByaXZhdGUgY291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgaW5pdGlhbENtZD86IENtZDxhbnk+O1xuICBwcml2YXRlIGN1cnJlbnRNb2RlbD86IE1vZGVsO1xuICBwcml2YXRlIGN1cnJlbnRTdWI/OiBTdWI8TXNnPjtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhZG9ubHk8UHJvZ3JhbVByb3BzPE1vZGVsLCBNc2c+Pikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmJkID0gdGhpcy5kaXNwYXRjaC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaXJlRXZlbnQoZTogRGV2VG9vbHNFdmVudDxNb2RlbCwgTXNnPikge1xuICAgIGlmICh0aGlzLnByb3BzLmRldlRvb2xzKSB7XG4gICAgICB0aGlzLnByb3BzLmRldlRvb2xzLm9uRXZlbnQoZSk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2gobXNnOiBNc2cpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3ViID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZGV2VG9vbHMgJiYgdGhpcy5wcm9wcy5kZXZUb29scy5pc1BhdXNlZCgpKSB7XG4gICAgICAvLyBkbyBub3QgcHJvY2VzcyBtZXNzYWdlcyBpZiB3ZSBhcmUgcGF1c2VkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb3VudCsrO1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jb3VudDtcbiAgICBjb25zdCBjdXJyZW50TW9kZWwgPSB0aGlzLmN1cnJlbnRNb2RlbDtcbiAgICBpZiAoY3VycmVudE1vZGVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSB0aGlzLnByb3BzLnVwZGF0ZShtc2csIGN1cnJlbnRNb2RlbCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5kZXZUb29scykge1xuICAgICAgICB0aGlzLmZpcmVFdmVudCh7XG4gICAgICAgICAgdGFnOiAndXBkYXRlZCcsXG4gICAgICAgICAgbXNnTnVtOiBjb3VudCxcbiAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICBtc2c6IG1zZyxcbiAgICAgICAgICBtb2RlbEJlZm9yZTogY3VycmVudE1vZGVsLFxuICAgICAgICAgIG1vZGVsQWZ0ZXI6IHVwZGF0ZWRbMF0sXG4gICAgICAgICAgY21kOiB1cGRhdGVkWzFdLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld1N1YiA9IHRoaXMucHJvcHMuc3Vic2NyaXB0aW9ucyh1cGRhdGVkWzBdKTtcbiAgICAgIGNvbnN0IHByZXZTdWIgPSB0aGlzLmN1cnJlbnRTdWI7XG5cbiAgICAgIGNvbnN0IGQgPSB0aGlzLmRpc3BhdGNoLmJpbmQodGhpcyk7XG5cbiAgICAgIG5ld1N1Yi5pbml0KGQpO1xuICAgICAgcHJldlN1Yj8ucmVsZWFzZSgpO1xuXG4gICAgICAvLyBwZXJmb3JtIGNvbW1hbmRzIGluIGEgc2VwYXJhdGUgdGltb3V0LCB0b1xuICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhpcyBkaXNwYXRjaCBpcyBkb25lXG4gICAgICBjb25zdCBjbWQgPSB1cGRhdGVkWzFdO1xuICAgICAgaWYgKCEoY21kIGluc3RhbmNlb2YgQ21kTm9uZSkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkaXNwYXRjaDogcHJvY2Vzc2luZyBjb21tYW5kc1wiKTtcbiAgICAgICAgICAvLyBkZWJ1ZyhcInBlcmZvcm1pbmcgY29tbWFuZFwiLCB1cGRhdGVkWzFdKTtcbiAgICAgICAgICB1cGRhdGVkWzFdLmV4ZWN1dGUoZCk7XG4gICAgICAgICAgLy8gZGVidWcoXCI8PDwgIGRvbmVcIik7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZWVkc1VwZGF0ZSA9IHRoaXMuY3VycmVudE1vZGVsICE9PSB1cGRhdGVkWzBdO1xuXG4gICAgICB0aGlzLmN1cnJlbnRNb2RlbCA9IHVwZGF0ZWRbMF07XG4gICAgICB0aGlzLmN1cnJlbnRTdWIgPSBuZXdTdWI7XG5cbiAgICAgIC8vIHRyaWdnZXIgcmVuZGVyaW5nXG4gICAgICBpZiAobmVlZHNVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY3VycmVudFN1Yj8ucmVsZWFzZSgpO1xuICAgIHRoaXMuY3VycmVudFN1YiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgZGV2VG9vbHMgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGRldlRvb2xzKSB7XG4gICAgICBkZXZUb29scy5jb25uZWN0ZWQodGhpcyk7XG4gICAgfVxuICAgIGNvbnN0IG1hYyA9IChkZXZUb29scyAmJiBkZXZUb29scy5pbml0RnJvbVNuYXBzaG90KCkpIHx8IHRoaXMucHJvcHMuaW5pdCgpO1xuICAgIGlmIChkZXZUb29scykge1xuICAgICAgdGhpcy5maXJlRXZlbnQoe1xuICAgICAgICB0YWc6ICdpbml0JyxcbiAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIG1vZGVsOiBtYWNbMF0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgc3ViID0gdGhpcy5wcm9wcy5zdWJzY3JpcHRpb25zKG1hY1swXSk7XG4gICAgdGhpcy5jdXJyZW50TW9kZWwgPSBtYWNbMF07XG4gICAgdGhpcy5jdXJyZW50U3ViID0gc3ViO1xuICAgIC8vIGNvbm5lY3QgdG8gc3ViXG4gICAgc3ViLmluaXQodGhpcy5iZCk7XG4gICAgdGhpcy5pbml0aWFsQ21kID0gbWFjWzFdO1xuXG4gICAgLy8gdHJpZ2dlciBpbml0aWFsIGNvbW1hbmRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdGlhbENtZCAmJiB0aGlzLmluaXRpYWxDbWQuZXhlY3V0ZSh0aGlzLmJkKTtcbiAgICB9LCAwKTtcblxuICAgIC8vIHRyaWdnZXIgcmVuZGVyaW5nIGFmdGVyIG1vdW50XG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICB9XG5cbiAgcmVuZGVyKCk6IFJlYWN0Tm9kZSB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1vZGVsICE9PSB1bmRlZmluZWQgJiYgdGhpcy5iZCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmlldyh0aGlzLmJkLCB0aGlzLmN1cnJlbnRNb2RlbCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0TW9kZWwobW9kZWw6IE1vZGVsLCB3aXRoU3ViczogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmJkKSB7XG4gICAgICBsZXQgbmV3U3ViOiBTdWI8TXNnPjtcbiAgICAgIGlmICh3aXRoU3Vicykge1xuICAgICAgICBuZXdTdWIgPSB0aGlzLnByb3BzLnN1YnNjcmlwdGlvbnMobW9kZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3U3ViID0gU3ViLm5vbmUoKTtcbiAgICAgIH1cbiAgICAgIG5ld1N1Yi5pbml0KHRoaXMuYmQpO1xuICAgICAgdGhpcy5jdXJyZW50U3ViICYmIHRoaXMuY3VycmVudFN1Yi5yZWxlYXNlKCk7XG4gICAgICB0aGlzLmN1cnJlbnRNb2RlbCA9IG1vZGVsO1xuICAgICAgdGhpcy5jdXJyZW50U3ViID0gbmV3U3ViO1xuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19