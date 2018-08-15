/**
 * @module metronical.proto
 */

export interface IString {
    lower: () => IString;
    upper: () => IString;
    ltrim: () => IString;
    rtrim: () => IString;
    trim: () => IString;
    normalize: () => IString;
    startsWith: (part: string, pos?: number) => boolean;
    endsWith: (part: string, pos?: number) => boolean;
    capFirst: () => IString;
    capWords: () => IString;
    truncateWords: (number: number) => IString;
    truncateWordsWithHtml: (number: number) => IString;
    stripHtml: () => IString;
    escapeHtml: () => IString;
    toBool: () => boolean;
    contains: (val: string) => boolean;
    slugify: (lower?: boolean) => IString;
    getValueByKey: (key: string) => IString;
    setValueByKey: (key: string, replacement: string) => IString;
    isNullOrEmpty: (val: any) => boolean;
    toString: () => string;
}

/*
export interface INumber {
    toBool: () => boolean;
    random: (min: number, max: number) => number;
}

interface IArray<T> {
    empty: () => Array<any>;
    isEmpty: () => boolean;
    each: (callback: Function) => void;
    remove: (item: any) => any;
    contains: (partial: string, strict: boolean) => boolean;
    indexOfPartial: (partial: string) => number;
    toObjectArray: (objName: string) => Array<any>;
}

interface IObject {
    extend: (dest: any, src: any) => any;
}

interface IDocument {
    selectOne: (selector: string) => Element;
    selectAll: (selector: string) => NodeListOf<IElement>;
    create: (html: string) => Element;
}

interface INodeList {
    each: (callback: Function) => void;
    last: () => Element;
}

interface IElement {
    attribute: (name: string, value?: string) => string & Element;
    parent: () => Element;
    first: (selector: string) => Element;
    append: (html: string) => Element;
    empty: () => Element;
    drop: () => Element;
    removeEvent: (event: string) => Element;
    addEvent: (event: string, callback: Function, overwrite?: boolean) => Element;
    show: (t?: string) => Element | void;
    hide: () => Element;
    toggle:()=> Element;
    addClass: (className: string) => Element;
    removeClass: (className: string) => Element;
    asString: () => string;
    selectOne: (selector: string) => Element;
    selectAll: (selector: string) => NodeListOf<Element>;
    hasMatches: (selector: string) => boolean;
    up: (selector: string) => Element;
    isHidden: () => Boolean;
    val: (val?: string) => string;
}

interface IHTMLElement {
    clean: () => HTMLElement;
    val: (val?: string) => string;
}

interface IXMLHttpRequest {
    responseJSON: () => JSON;
}
*/
