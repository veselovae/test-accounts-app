import type {EAccountTypes} from "../constants";

export type AccountType = `${EAccountTypes}`;

export interface Label {
    text: string;
}

export interface Account {
    id: string;
    labels: Label[];
    type: AccountType;
    login: string;
    password: string | null;
}