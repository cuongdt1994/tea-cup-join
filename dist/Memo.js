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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memo = void 0;
const React = __importStar(require("react"));
function compareRefEquals(o1, o2) {
    return o1 === o2;
}
/**
 * Memoize the view for passed data.
 * @param t the data to memoize.
 * @param compareFn optional comparison function. Defaults to ref equality
 */
function memo(t, compareFn) {
    const equals = compareFn !== null && compareFn !== void 0 ? compareFn : compareRefEquals;
    return (f) => {
        return React.createElement(Memo, {
            value: t,
            renderer: (x) => {
                return f(x);
            },
            compareFn: equals,
        });
    };
}
exports.memo = memo;
class Memo extends React.Component {
    render() {
        return this.props.renderer(this.props.value);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.props.compareFn(this.props.value, nextProps.value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9UZWFDdXAvTWVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsNkNBQStCO0FBRS9CLFNBQVMsZ0JBQWdCLENBQUksRUFBSyxFQUFFLEVBQUs7SUFDdkMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsSUFBSSxDQUFJLENBQUksRUFBRSxTQUFxQztJQUNqRSxNQUFNLE1BQU0sR0FBRyxTQUFTLGFBQVQsU0FBUyxjQUFULFNBQVMsR0FBSSxnQkFBZ0IsQ0FBQztJQUM3QyxPQUFPLENBQUMsQ0FBNEIsRUFBRSxFQUFFO1FBQ3RDLE9BQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDL0IsS0FBSyxFQUFFLENBQUM7WUFDUixRQUFRLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxDQUFDO1lBQ0QsU0FBUyxFQUFFLE1BQU07U0FDbEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVhELG9CQVdDO0FBUUQsTUFBTSxJQUFRLFNBQVEsS0FBSyxDQUFDLFNBQW9CO0lBQzlDLE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELHFCQUFxQixDQUFDLFNBQThCLEVBQUUsU0FBdUIsRUFBRSxXQUFnQjtRQUM3RixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxOSBSw6ltaSBWYW4gS2Vpc2JlbGNrXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKi9cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBjb21wYXJlUmVmRXF1YWxzPFQ+KG8xOiBULCBvMjogVCk6IGJvb2xlYW4ge1xuICByZXR1cm4gbzEgPT09IG8yO1xufVxuXG4vKipcbiAqIE1lbW9pemUgdGhlIHZpZXcgZm9yIHBhc3NlZCBkYXRhLlxuICogQHBhcmFtIHQgdGhlIGRhdGEgdG8gbWVtb2l6ZS5cbiAqIEBwYXJhbSBjb21wYXJlRm4gb3B0aW9uYWwgY29tcGFyaXNvbiBmdW5jdGlvbi4gRGVmYXVsdHMgdG8gcmVmIGVxdWFsaXR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZW1vPFQ+KHQ6IFQsIGNvbXBhcmVGbj86IChvMTogVCwgbzI6IFQpID0+IGJvb2xlYW4pIHtcbiAgY29uc3QgZXF1YWxzID0gY29tcGFyZUZuID8/IGNvbXBhcmVSZWZFcXVhbHM7XG4gIHJldHVybiAoZjogKHQ6IFQpID0+IFJlYWN0LlJlYWN0Tm9kZSkgPT4ge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbW8sIHtcbiAgICAgIHZhbHVlOiB0LFxuICAgICAgcmVuZGVyZXI6ICh4OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGYoeCk7XG4gICAgICB9LFxuICAgICAgY29tcGFyZUZuOiBlcXVhbHMsXG4gICAgfSk7XG4gIH07XG59XG5cbmludGVyZmFjZSBNZW1vUHJvcHMge1xuICB2YWx1ZTogYW55O1xuICByZW5kZXJlcjogKHg6IGFueSkgPT4gUmVhY3QuUmVhY3ROb2RlO1xuICBjb21wYXJlRm46IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuO1xufVxuXG5jbGFzcyBNZW1vPFQ+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PE1lbW9Qcm9wcz4ge1xuICByZW5kZXIoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZW5kZXJlcih0aGlzLnByb3BzLnZhbHVlKTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHM6IFJlYWRvbmx5PE1lbW9Qcm9wcz4sIG5leHRTdGF0ZTogUmVhZG9ubHk8e30+LCBuZXh0Q29udGV4dDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLmNvbXBhcmVGbih0aGlzLnByb3BzLnZhbHVlLCBuZXh0UHJvcHMudmFsdWUpO1xuICB9XG59XG4iXX0=