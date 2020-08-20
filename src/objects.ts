import { IObject } from './schema';

/**
 * @module quietmath/proto
 */

class _obj implements IObject {
    private value: any;
    constructor(private readonly _value: any) {
        this.value = this._value;
    }
    public extend(data: any): IObject {
        for (const prop in data) {
            // eslint-disable-next-line no-prototype-builtins
            if(data.hasOwnProperty(prop)) {
                this.value[prop] = data[prop];
            }
        }
        return this;
    }
    public toObject(): any {
        return this.value;
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function obj(value: any): IObject {
    return new _obj(value);
}
