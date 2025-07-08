<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountsStore } from "../store";
import AccountRow from "./AccountRow.vue";
import { Plus, QuestionFilled } from "@element-plus/icons-vue";

const store = useAccountsStore();
const { accounts } = storeToRefs(store);

const addAccount = () => store.addEmptyAccount();
const removeAccount = (id: string) => store.removeAccount(id);
const updateAccount = (account: any) => store.updateAccount(account);
</script>

<template>
  <el-card class="wrapper">
    <div class="header">
      <h3>Учетные записи</h3>
      <el-button
          :icon="Plus"
          @click="addAccount"
          class="add-account-btn"
      />
    </div>

    <div class="hint">
      <el-icon class="hint-icon"><QuestionFilled /></el-icon>
      Для указания нескольких меток для одной пары логин/пароль
      используйте разделитель ;
    </div>

    <div class="account-list" v-if="accounts.length">
      <div class="column-titles">
        <el-text class="mx-1" type="info">Метка</el-text>
        <el-text class="mx-1" type="info">Тип</el-text>
        <el-text class="mx-1" type="info">Логин</el-text>
        <el-text class="mx-1" type="info">Пароль</el-text>
        <el-text class="mx-1" type="info"></el-text>
      </div>
      <AccountRow
          v-for="account in accounts"
          :key="account.id"
          :account="account"
          @remove="removeAccount"
          @update="updateAccount"
      />
    </div>
  </el-card>
</template>

<style scoped>
.wrapper {
  max-width: 939px;
  width: 100%;
  display: inline-block;
  margin: 2rem;
  padding: 1rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 20px;
}

.hint {
  display: flex;
  gap: 1rem;
  background-color: #eef4fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.hint-icon {
  width: 1rem;
  height: 1rem;
}

.add-account-btn {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  padding: 0.25rem;
}

.account-list {
  display: flex;
  flex-direction: column;
}

.column-titles {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 2.5rem;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
</style>
