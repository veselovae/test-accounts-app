<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import {EAccountTypes} from "../constants";
</script>

<template>
  <el-form>
    <el-form-item prop="labels">
      <el-input />
    </el-form-item>

    <el-form-item prop="type">
      <el-select placeholder="Выберите тип">
        <el-option :label="EAccountTypes.LDAP" :value="EAccountTypes.LDAP" />
        <el-option :label="EAccountTypes.LOCAL" :value="EAccountTypes.LOCAL" />
      </el-select>
    </el-form-item>

    <el-form-item prop="login">
      <el-input placeholder="Введите логин"/>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
          type="password"
          show-password
      />
    </el-form-item>

    <el-button :icon="Delete" />
  </el-form>
</template>

<style scoped>
.el-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 2.5rem;
  gap: 10px;
}

.el-form-item {
  flex: 1;
}

.el-form-item.full-width {
  grid-column: span 2;
}
</style>