export class Entity {

    private _id: string;

    /**
     * Getter id
     * @return {string}
     */
	public get $id(): string {
		return this._id;
	}

    /**
     * Setter id
     * @param {string} value
     */
    public set $id(value: string) {
		this._id = value;
	}

    constructor(data?: any) {
        if (data != undefined) {
			this.$id = data._id;
		}
	}

} 