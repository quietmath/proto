import { IString } from "./types";

/**
 * @module metronical.proto
 */

export function s(value: string): IString {
    return new _s(value);
}

class _s implements IString {
    private value: string;
    constructor(private readonly _value: string = "") {
        this.value = this._value;
    }
    public lower(): IString {
        this.value = this.value.toLocaleLowerCase();
        return this;
    }
    public upper(): IString {
        this.value = this.value.toUpperCase();
        return this;
    }
    public trim(): IString {
        this.value = this.value.replace(/^\s+|\s+$/g, "");
        return this;
    }
    public ltrim(): IString {
        this.value = this.value.replace(/^\s+/, "");
        return this;
    }
    public rtrim(): IString {
        this.value = this.value.replace(/\s+$/, "");
        return this;
    }
    public normalize(): IString {
        return this.replace(/^\s*|\s(?=\s)|\s*$/g, "");
    }
    public startsWith(part: string, pos?: number): boolean {
        return this.slice(0, part.length) == part;
    }
    public endsWith(part: string, pos?: number): boolean {
        return this.slice(part.length) == part;
    }
    public capFirst(): IString {
        if (this.length == 1) {
            return this.toUpperCase();
        }
        else if (this.length > 0) {
            let regex: RegExp = /^(\(|\[|"|')/;
            if (regex.test(this)) {
                return this.substring(0, 2).toUpperCase() + this.substring(2);
            }
            else {
                return this.substring(0, 1).toUpperCase() + this.substring(1);
            }
        }
        return null;
    }
    public capWords(): IString {
        let regexp: RegExp = /\s/;
        let words = this.split(regexp);
        if (words.length == 1) {
            return words[0].capFirst();
        }
        else if (words.length > 1) {
            let result: string = '';
            for (let i = 0; i < words.length; i++) {
                if (words[i].capFirst() !== null) {
                    result += words[i].capFirst() + ' ';
                }
            }
            result.trim();
            return result;
        }
        return null;
    }
    public truncateWords(num: number): IString {
        let words: Array<string> = this.split(/\s+/);
        if (words.length > num) {
            return words.slice(0, num).join(' ');
        }
        return words.join(' ');
    }
    public truncateWordsWithHtml(num: number): IString {
        let tags: Array<string> = [];
        let truncation: string = this.truncateWords(num);
        let matches: RegExpMatchArray = truncation.match(/<[\/]?([^> ]+)[^>]*>/g);
        for (let i: number = 0; i < matches.length; i++) {
            let opening: string = matches[i].replace('/', '');
            if (matches[i].indexOf('/') != -1 && tags.indexOf(opening) != -1) {
                (<any>tags).remove(opening);
            }
            else if (matches[i].indexOf('/') != -1) {
                continue;
            }
            else {
                tags.push(matches[i]);
            }
        }
        for (let i: number = 0; i < tags.length; i++) {
            truncation += tags[i].replace('<', '</').replace(/(\s*)(\w+)=("[^<>"]*"|'[^<>']*'|\w+)/g, '');
        }
        return truncation;
    }
    public stripHtml(): IString {
        let content: string = this.replace(/<[\/]?([^> ]+)[^>]*>/g, '');
        content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/ig, '');
        content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/ig, '');
        content = content.replace(/<!--[\s\S]*?-->/g, '');
        content = content.replace('&nbsp;', ' ');
        content = content.replace('&amp;', '&');
        return content;
    }
    public escapeHtml(): IString {
        let content: string = this.replace(/"/g, '&quot;');
        content.replace(/&(?!\w+;)/g, '&amp;');
        content.replace(/>/g, '&gt;');
        content.replace(/</g, '&lt;');
        return content;
    }
    public toBool(): boolean {
        if ((<any>String).isNullOrEmpty(this)) {
            return false;
        }
        else if (this.lower() === "true" || this.lower() === "1" || this.lower() === "y" || this.lower() === "t") {
            return true;
        }
        return false;
    }
    public contains(val: string): boolean {
        if (this.indexOf(val) !== -1) {
            return true;
        }
        return false;
    }
    public slugify(lower: boolean = true): IString {
        if (!lower) {
            return this.lower().normalize().replace(/[^a-z0-9]/gi, '-');
        }
        return this.normalize().replace(/[^a-z0-9]/gi, '-');
    }
    public getValueByKey(key: string): IString {
        var collection: Array<string> = this.split(";");
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].contains(":")) {
                let pairs = collection[i].split(":");
                if (pairs[0] == key) {
                    return pairs[1];
                }
            }
        }
        return null;
    }
    public setValueByKey(key: string, replacement: string): IString {
        var collection: Array<string> = this.split(";");
        var returnCollection: Array<string> = [];
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].contains(":")) {
                let pairs = collection[i].split(":");
                if (pairs[0] == key) {
                    pairs[1] = replacement;
                }
                returnCollection.push(pairs.join(":"));
            }
        }
        return returnCollection.join(';');
    }
    public isNullOrEmpty(val: any): boolean {
        if (val === undefined || val === null || val.trim() === '') {
            return true;
        }
        return false;
    }
}
