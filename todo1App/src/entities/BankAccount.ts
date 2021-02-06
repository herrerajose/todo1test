import { Entity } from './Entity';
import { Transaction } from './Transaction';

export class BankAccount extends Entity {

    private _accountValue: number;
    private _accountType: string;
    private _transactionList: Transaction[]=[];

    /**
     * Getter accountValue
     * @return {number}
     */
	public get $accountValue(): number {
		return this._accountValue;
	}

    /**
     * Getter accountType
     * @return {string}
     */
	public get $accountType(): string {
		return this._accountType;
	}

    /**
     * Getter transactionList
     * @return {Transaction[]}
     */
	public get $transactionList(): Transaction[] {
		return this._transactionList;
	}

    /**
     * Setter accountValue
     * @param {number} value
     */
	public set $accountValue(value: number) {
		this._accountValue = value;
	}

    /**
     * Setter accountType
     * @param {string} value
     */
	public set $accountType(value: string) {
		this._accountType = value;
	}

    /**
     * Setter transactionList
     * @param {Transaction[]} value
     */
	public set $transactionList(value: Transaction[]) {
		this._transactionList = value;
	}

    constructor(data?: any) {
        super();
        if (data != undefined) {
            this.$id = data._id;
            this.$accountValue = data._accountValue;
            this.$accountType = data._accountType;
            if (data._transactionList) {
				data._transactionList.forEach(transactionElementList => {    
					this.$transactionList.push(new Transaction(transactionElementList));
				})
            }  
		}
	}

} 