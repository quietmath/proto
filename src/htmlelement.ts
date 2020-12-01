/* eslint-disable no-case-declarations */
import { IHTMLElement } from './schema';
import { s } from './strings';

/**
 * @module quietmath/proto
 */

class _helem implements IHTMLElement {
    private helem: HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement;
    constructor(private readonly _helem: HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement) {
        this.helem = this._helem;
    }
    public clean(): IHTMLElement {
        this.helem.value = this.helem.value.replace(/\r?\n/g, '\r\n');
        return this;
    }
    public val(val?: string): string | number | boolean {
        if(val != null) {
            if(s(this.helem.nodeName).lower().toString() == 'textarea') {
                this.helem.innerHTML = val;
                try {
                    this.helem.innerText = val;
                }
                catch (e) {
                    console.error(e);
                }
                try {
                    this.helem.value = val;
                }
                catch (e) {
                    console.error(e);
                }
            }
            else if(s(this.helem.nodeName).lower().toString() == 'input' && this.helem.getAttribute('type') != null) {
                switch(s(this.helem.getAttribute('type')).lower().toString()) {
                    case 'file':
                        break;
                    case 'checkbox':
                        if (val) {
                            this.helem.checked = true;
                        }
                        else {
                            this.helem.checked = false;
                        }
                        break;
                    case 'radio':
                        const name: string = this.helem.getAttribute('name');
                        const radios: NodeListOf<Element> = document.querySelectorAll(`input[type='radio'][name='${ name }']`);
                        radios.forEach((elem: Element) => {
                            if(elem.getAttribute('value') == val) {
                                (elem as HTMLInputElement).checked = true;
                            }
                            else {
                                (elem as HTMLInputElement).checked = false;
                            }
                        });
                        break;
                    case 'date':
                        let date: string = val;
                        if (s(date).contains('T')) {
                            date = date.slice(0, date.indexOf('T'));
                        }
                        if (/\d{2}\/\d{2}\/\d{4}/g.test(val)) {
                            this.helem.value = `${ date.slice(6, 10) }-${ date.slice(0, 2) }-${ date.slice(3, 5) }`;
                        } else {
                            this.helem.value = date;
                        }
                        break;
                    case 'time':
                        const time: string = val;
                        if (/\d{2}:\d{2}:\d{2}/g.test(time)) {
                            this.helem.value = time.slice(0, 5);
                        }
                        else {
                            this.helem.value = time;
                        }
                        break;
                    default:
                        this.helem.value = val;
                        break;
                }
            }
            else if(s(this.helem.nodeName).lower().toString() == 'select') {
                for(let i = 0; i < this.helem.options.length; i++) {
                    if(this.helem.options[i].value == val) {
                        this.helem.selectedIndex = i;
                        break;
                    }
                }
            }
        }
        else {
            if (s(this.helem.nodeName).lower().toString() == 'textarea') {
                try {
                    return this.helem.value;
                }
                catch (e) {
                    console.error(e);
                }
                if (this.helem.innerText != null && (this.helem.innerText as string).trim() != '') {
                    return this.helem.innerText;
                }
                else if (this.helem.innerHTML != null && this.helem.innerHTML.trim() != '') {
                    return this.helem.innerHTML;
                }
                return null;
            }
            else if(s(this.helem.nodeName).lower().toString() == 'input' && this.helem.getAttribute('type') != null) {
                switch(s(this.helem.getAttribute('type')).lower().toString()) {
                    case 'checkbox':
                        return this.helem.checked;
                    case 'radio':
                        const name: string = this.helem.getAttribute('name');
                        return (document.querySelector(`input[type='radio'][name='${ name }']:checked`) != null) ? (document.querySelector(`input[type='radio'][name='${ name }']:checked`) as HTMLInputElement).value : null;
                    case 'time':
                        return this.helem.value;
                    default:
                        return this.helem.value;
                }
            }
            else if (s(this.helem.nodeName).lower().toString() == 'select') {
                if (this.helem.selectedIndex == -1) {
                    return null;
                } else {
                    if (this.helem.multiple) {
                        let values = '';
                        for (let i = 0; i < this.helem.options.length; i++) {
                            if (this.helem.options[i].selected) {
                                values += `${ this.helem.options[i].value };`;
                            }
                        }
                        return values.slice(0, -1);
                    } else {
                        return this.helem.options[this.helem.selectedIndex].value;
                    }
                }
            }
        }
        return val;
    }
    public toHTMLElement(): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
        return this.helem;
    }
}

export function helem(elem: HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement): IHTMLElement {
    return new _helem(elem);
}
