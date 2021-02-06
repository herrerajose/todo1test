import { Entity } from './Entity';

export class Card extends Entity {
    
    private _cardNumber: number;
    private _cardValue: number;
    private _cardReleaseDate: Date;
    private _cardExpirationDate: Date;
    private _cardCVV: string;
    private _cardType: string;

    /**
     * Getter cardNumber
     * @return {number}
     */
	public get $cardNumber(): number {
		return this._cardNumber;
	}

    /**
     * Getter cardValue
     * @return {number}
     */
	public get $cardValue(): number {
		return this._cardValue;
	}

    /**
     * Getter cardReleaseDate
     * @return {Date}
     */
	public get $cardReleaseDate(): Date {
		return this._cardReleaseDate;
	}

    /**
     * Getter cardExpirationDate
     * @return {Date}
     */
	public get $cardExpirationDate(): Date {
		return this._cardExpirationDate;
	}

    /**
     * Getter cardCVV
     * @return {string}
     */
	public get $cardCVV(): string {
		return this._cardCVV;
	}

    /**
     * Getter cardType
     * @return {string}
     */
	public get $cardType(): string {
		return this._cardType;
	}

    /**
     * Setter cardNumber
     * @param {number} value
     */
	public set $cardNumber(value: number) {
		this._cardNumber = value;
	}

    /**
     * Setter cardValue
     * @param {number} value
     */
	public set $cardValue(value: number) {
		this._cardValue = value;
	}

    /**
     * Setter cardReleaseDate
     * @param {Date} value
     */
	public set $cardReleaseDate(value: Date) {
		this._cardReleaseDate = value;
	}

    /**
     * Setter cardExpirationDate
     * @param {Date} value
     */
	public set $cardExpirationDate(value: Date) {
		this._cardExpirationDate = value;
	}

    /**
     * Setter cardCVV
     * @param {string} value
     */
	public set $cardCVV(value: string) {
		this._cardCVV = value;
	}

    /**
     * Setter cardType
     * @param {string} value
     */
	public set $cardType(value: string) {
		this._cardType = value;
	}

    constructor(data?: any) {
        super();
        if (data != undefined) {
            this.$id = data._id;
            this.$cardNumber = data._cardNumber;
            this.$cardValue = data._cardValue;
            this.$cardReleaseDate = data._cardReleaseDate;
            this.$cardExpirationDate = data._cardExpirationDate;
            this.$cardCVV = data._cardCVV;
            this.$cardType = data._cardType;
		}
	}

} 