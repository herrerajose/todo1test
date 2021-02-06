import { Entity } from './Entity';

export class UserLogin extends Entity {
 
    private email: string;
    private password: string;
    private returnSecureToken: boolean;

    /**
     * Getter $email
     * @return {string}
     */
	public get $email(): string {
		return this.email;
	}

    /**
     * Getter $password
     * @return {string}
     */
	public get $password(): string {
		return this.password;
	}

    /**
     * Getter $returnSecureToken
     * @return {boolean}
     */
	public get $returnSecureToken(): boolean {
		return this.returnSecureToken;
	}

    /**
     * Setter $email
     * @param {string} value
     */
	public set $email(value: string) {
		this.email = value;
	}

    /**
     * Setter $password
     * @param {string} value
     */
	public set $password(value: string) {
		this.password = value;
	}

    /**
     * Setter $returnSecureToken
     * @param {boolean} value
     */
	public set $returnSecureToken(value: boolean) {
		this.returnSecureToken = value;
	}

    constructor(data?: any) {
        super();
        if (data != undefined) {
            this.$email = data._email;
            this.$password = data._password;
            this.$returnSecureToken = data._token;
		}
	}

} 