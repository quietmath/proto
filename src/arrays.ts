import { IArray } from './schema';

/**
 * @module quietmath/proto
 */

class _a<T> implements IArray<T> {
    private value: T[];
    constructor(private readonly _value: T[] = []) {
        this.value = this._value;
    }
    public empty(): IArray<T> {
        this.value = this.value.splice(0, this.value.length);
        return this;
    }
    public isEmpty(): boolean {
        if (this.value.length === 0) {
            return true;
        }
        return false;
    }
    public each(callback: (i: number, t: any) => void): void {
        for (let i = 0; i < this.value.length; i++) {
            callback(i, (this as any)[i]);
        }
    }
    public remove(item: T): IArray<T> {
        const index: number = this.value.indexOf(item);
        if (index != -1) {
            this.value = this.value.splice(index, 1);
            return this;
        }
        return this;
    }
    public contains(partial: string, strict: boolean): boolean {
        for (let i = 0; i < this.value.length; i++) {
            if (!strict && (this as any)[i].contains(partial)) {
                return true;
            }
            if (strict && (this as any)[i] === partial) {
                return true;
            }
        }
        return false;
    }
    public indexOfPartial(partial: string): number {
        for (let i = 0; i < this.value.length; i++) {
            if ((this as any)[i].contains(partial)) {
                return i;
            }
        }
        return -1;
    }
    public toObjectArray(objName: string): IArray<T> {
        if (objName === undefined || objName === null) {
            throw 'Error: Property name must be provided for conversion.';
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const items: any = this;
        if (typeof (items[0]) === 'string' || typeof (items[0]) === 'number' || typeof (items[0]) === 'boolean') {
            for (let i = 0; i < items.length; i++) {
                const val: any = items[i];
                items[i] = {};
                items[i][objName] = val;
            }
            return items;
        }
        else {
            return this;
        }
    }
    public toArray(): T[] {
        return this.value;
    }
}

export const range = (max: number, min?: number): number[] => {
    if(min == null) {
        min = 1;
    }
    return Array.from(new Array(max), (x, i) => i + (min as number));
};

export function a<T>(value: T[]): IArray<T> {
    return new _a(value);
}
