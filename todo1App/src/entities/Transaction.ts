import { Entity } from './Entity';

export class Transaction extends Entity {

    private _transactionValue: number;
    private _transactionDate: Date;
    private _transactionType: string;
    private _transactionDescription: string;

    /**
     * Getter transactionValue
     * @return {number}
     */
	public get $transactionValue(): number {
		return this._transactionValue;
	}

    /**
     * Getter transactionDate
     * @return {Date}
     */
	public get $transactionDate(): Date {
		return this._transactionDate;
	}

    /**
     * Getter transactionType
     * @return {string}
     */
	public get $transactionType(): string {
		return this._transactionType;
	}

    /**
     * Getter transactionDescription
     * @return {string}
     */
	public get $transactionDescription(): string {
		return this._transactionDescription;
	}

    /**
     * Setter transactionValue
     * @param {number} value
     */
	public set $transactionValue(value: number) {
		this._transactionValue = value;
	}

    /**
     * Setter transactionDate
     * @param {Date} value
     */
	public set $transactionDate(value: Date) {
		this._transactionDate = value;
	}

    /**
     * Setter transactionType
     * @param {string} value
     */
	public set $transactionType(value: string) {
		this._transactionType = value;
	}

    /**
     * Setter transactionDescription
     * @param {string} value
     */
	public set $transactionDescription(value: string) {
		this._transactionDescription = value;
	}   

    constructor(data?: any) {
        super();
        if (data != undefined) {
            this.$id = data._id;
            this.$transactionValue = data._transactionValue;
            this.$transactionDate = data._transactionDate;
            this.$transactionType = data._transactionType;
            this.$transactionDescription = data._transactionDescription;
		}
	}

} 