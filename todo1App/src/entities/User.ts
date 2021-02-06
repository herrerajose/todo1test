import { Entity } from './Entity';
import { Card } from './Card';
import { BankAccount } from './BankAccount';

export class User extends Entity {
 
    private _email: string;
    private _password: string;
    private _token: string;
    private _dni: string;
    private _name: string;
    private _lastname: string;
    private _cellphone: number;
    private _phone: number;
    private _address: string;
    private _bankAccountList: BankAccount[]=[];
    private _cardList: Card[]=[];

    /**
     * Getter email
     * @return {string}
     */
	public get $email(): string {
		return this._email;
	}

    /**
     * Getter password
     * @return {string}
     */
	public get $password(): string {
		return this._password;
	}

    /**
     * Getter token
     * @return {string}
     */
	public get $token(): string {
		return this._token;
	}

    /**
     * Getter dni
     * @return {string}
     */
	public get $dni(): string {
		return this._dni;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get $name(): string {
		return this._name;
	}

    /**
     * Getter lastname
     * @return {string}
     */
	public get $lastname(): string {
		return this._lastname;
	}

    /**
     * Getter cellphone
     * @return {number}
     */
	public get $cellphone(): number {
		return this._cellphone;
	}

    /**
     * Getter phone
     * @return {number}
     */
	public get $phone(): number {
		return this._phone;
	}

    /**
     * Getter address
     * @return {string}
     */
	public get $address(): string {
		return this._address;
	}

    /**
     * Getter bankAccountList
     * @return {BankAccount[]}
     */
	public get $bankAccountList(): BankAccount[] {
		return this._bankAccountList;
	}

    /**
     * Getter cardList
     * @return {Card[]}
     */
	public get $cardList(): Card[] {
		return this._cardList;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set $email(value: string) {
		this._email = value;
	}

    /**
     * Setter password
     * @param {string} value
     */
	public set $password(value: string) {
		this._password = value;
	}

    /**
     * Setter token
     * @param {string} value
     */
	public set $token(value: string) {
		this._token = value;
	}

    /**
     * Setter dni
     * @param {string} value
     */
	public set $dni(value: string) {
		this._dni = value;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set $name(value: string) {
		this._name = value;
	}

    /**
     * Setter lastname
     * @param {string} value
     */
	public set $lastname(value: string) {
		this._lastname = value;
	}

    /**
     * Setter cellphone
     * @param {number} value
     */
	public set $cellphone(value: number) {
		this._cellphone = value;
	}

    /**
     * Setter phone
     * @param {number} value
     */
	public set $phone(value: number) {
		this._phone = value;
	}

    /**
     * Setter address
     * @param {string} value
     */
	public set $address(value: string) {
		this._address = value;
	}

    /**
     * Setter bankAccountList
     * @param {BankAccount[]} value
     */
	public set $bankAccountList(value: BankAccount[]) {
		this._bankAccountList = value;
	}

    /**
     * Setter cardList
     * @param {Card[]} value
     */
	public set $cardList(value: Card[]) {
		this._cardList = value;
	}

    constructor(data?: any) {
        super();
        if (data != undefined) {
            this.$id = data._id;
            this.$email = data._email;
            this.$password = data._password;
            this.$token = data._token;
            this.$dni = data._dni;
            this.$name = data._name;
            this.$lastname = data._lastname;
            this.$cellphone = data._cellphone;
            this.$phone = data._phone;
            this.$address = data._address;

            if (data._bankAccountList) {
				data._bankAccountList.forEach(bankAccountElementList => {    
					this.$bankAccountList.push(new BankAccount(bankAccountElementList));
				})
            }  
            if (data._cardList) {
				data._cardList.forEach(cardElementList => {    
					this.$cardList.push(new Card(cardElementList));
				})
            }  
		}
	}

} 