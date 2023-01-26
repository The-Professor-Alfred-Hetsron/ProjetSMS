import User from "src/Types/user";

export class AddUser {
    constructor(public readonly payload: User) {}
}
export class DeleteUser {
    constructor(public readonly payload: User) {}
}