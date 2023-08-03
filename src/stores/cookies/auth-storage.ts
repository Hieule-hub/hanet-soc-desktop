import Storage from './cookie-storage';

class AuthStorage extends Storage {
    // eslint-disable-next-line class-methods-use-this
    get loggedIn() {
        // console.log('---AuthStorage----loggedIn()------',this.values,!!this.values && !!this.values.token);
        return !!this.values && !!this.values.token;
    }

    get token() {
        // console.log('---AuthStorage----token()------', (this.values && this.values.token));
        return this.values && this.values.token;
    }

    get userId() {
        // console.log('---AuthStorage----userId()------', (this.values && this.values.userId));
        return this.values && this.values.userId;
    }

    get role() {
        // console.log('---AuthStorage----role()------', (this.values && this.values.role));
        return this.values && this.values.role;
    }
}

export default new AuthStorage('AUTH');
