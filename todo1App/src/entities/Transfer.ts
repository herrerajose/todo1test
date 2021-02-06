import { Entity } from './Entity';

export class Transfer extends Entity {

    private _originAccount: string;
    private _destinyName: string;
    private _destinyEmail: string;
    private _destinyPhone: number;
    private _destinyAccount: string;
    private _currency: string;
    private _amount: number;
    private _description: string;

    /**
     * Getter originAccount
     * @return {string}
     */
	public get $originAccount(): string {
		return this._originAccount;
	}

    /**
     * Getter destinyName
     * @return {string}
     */
	public get $destinyName(): string {
		return this._destinyName;
	}

    /**
     * Getter destinyEmail
     * @return {string}
     */
	public get $destinyEmail(): string {
		return this._destinyEmail;
	}

    /**
     * Getter destinyPhone
     * @return {number}
     */
	public get $destinyPhone(): number {
		return this._destinyPhone;
	}

    /**
     * Getter destinyAccount
     * @return {string}
     */
	public get $destinyAccount(): string {
		return this._destinyAccount;
	}

    /**
     * Getter currency
     * @return {string}
     */
	public get $currency(): string {
		return this._currency;
	}

    /**
     * Getter amount
     * @return {number}
     */
	public get $amount(): number {
		return this._amount;
	}

    /**
     * Getter description
     * @return {string}
     */
	public get $description(): string {
		return this._description;
	}

    /**
     * Setter originAccount
     * @param {string} value
     */
	public set $originAccount(value: string) {
		this._originAccount = value;
	}

    /**
     * Setter destinyName
     * @param {string} value
     */
	public set $destinyName(value: string) {
		this._destinyName = value;
	}

    /**
     * Setter destinyEmail
     * @param {string} value
     */
	public set $destinyEmail(value: string) {
		this._destinyEmail = value;
	}

    /**
     * Setter destinyPhone
     * @param {number} value
     */
	public set $destinyPhone(value: number) {
		this._destinyPhone = value;
	}

    /**
     * Setter destinyAccount
     * @param {string} value
     */
	public set $destinyAccount(value: string) {
		this._destinyAccount = value;
	}

    /**
     * Setter currency
     * @param {string} value
     */
	public set $currency(value: string) {
		this._currency = value;
	}

    /**
     * Setter amount
     * @param {number} value
     */
	public set $amount(value: number) {
		this._amount = value;
	}

    /**
     * Setter description
     * @param {string} value
     */
	public set $description(value: string) {
		this._description = value;
	}

    constructor(data?: any) {
        super();
        if (data != undefined) {
            this.$id = data._id;
            this.$originAccount = data._originAccount;
            this.$destinyName = data._destinyName;
            this.$destinyEmail = data._destinyEmail;
            this.$destinyPhone = data._destinyPhone;
            this.$destinyAccount = data._destinyAccount;
            this.$currency = data._currency;
            this.$amount = data._amount;
            this.$description = data._description;
		}
	}

} 