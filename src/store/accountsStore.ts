import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import type { Account } from "../types";
import {EAccountTypes} from "../constants";

export const useAccountsStore = defineStore("accounts", {
    state: () => ({
        accounts: [
            {
                id: nanoid(),
                labels: [],
                type: EAccountTypes.LOCAL,
                login: "",
                password: "",
            },
        ] as Account[],
    }),
    actions: {
        addEmptyAccount() {
            this.accounts.push({
                id: nanoid(),
                labels: [],
                type: EAccountTypes.LOCAL,
                login: "",
                password: "",
            });
        },
        removeAccount(id: string) {
            this.accounts = this.accounts.filter((acc) => acc.id !== id);
        },
        updateAccount(account: Account) {
            const idx = this.accounts.findIndex(({ id }) => id === account.id);
            if (idx !== -1) this.accounts[idx] = { ...account };
        },
    },
    persist: true,
});
