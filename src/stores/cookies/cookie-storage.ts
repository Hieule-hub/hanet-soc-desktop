import Cookies, { CookieAttributes } from 'js-cookie';

const cookie = Cookies.withConverter({
    read: (value) => JSON.parse(value),
    write: (value) => JSON.stringify(value)
});

const initOpts: CookieAttributes = {
    path: '/',
    // expires: 30 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
    // domain: '.allsubdomains.com',
    sameSite: 'strict'
};

export default class Storage {
    private name: string;

    private options: CookieAttributes;

    constructor(name = 'COOKES_NAME', values = null, options = initOpts) {
        this.name = name;
        this.options = options;

        if (!this.values) {
            this.values = values;
        }
    }

    get values(): any {
        return cookie.get(this.name);
    }

    set values(values) {
        cookie.set(this.name, values, initOpts);
    }

    // eslint-disable-next-line class-methods-use-this
    get allCookies() {
        return cookie.get();
    }

    destroy = (next: any = (f) => f) => {
        cookie.remove(this.name, this.options);
        next();
    };
}
