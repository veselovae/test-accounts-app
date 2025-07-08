<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import {EAccountTypes} from "../constants";
import { ref } from "vue";
import { ElForm, type FormRules } from "element-plus";
import type {Account} from "../types";

const props = defineProps<{
  account: Account;
}>();

const emit = defineEmits(["update", "remove"]);

const formRef = ref<InstanceType<typeof ElForm>>();

const rules: FormRules = {
  label: [
    {
      type: "string",
      max: 50,
      message: "Максимум 50 символов",
      trigger: "blur",
    },
  ],
  type: [
    {
      required: true,
      message: "",
      trigger: "change",
    },
  ],
  login: [
    {
      required: true,
      message: "",
      trigger: "blur",
    },
    {
      max: 100,
      message: "Максимум 100 символов",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "",
      trigger: "blur",
    },
    {
      max: 100,
      message: "Максимум 100 символов",
      trigger: "blur",
    },
  ],
};

const formValues = ref({
  id: props.account.id,
  label: props.account.labels.map((l) => l.text).join(";"),
  type: props.account.type,
  login: props.account.login,
  password: props.account.password ?? "",
});

const validateAndEmit = () => {
  if (!formRef.value) return;

  formRef.value.validate((valid: boolean) => {
    if (!valid) return;

    const {label, type, login, password} = formValues.value

    emit("update", {
      id: props.account.id,
      labels: label
          .split(";")
          .map((str) => str.trim())
          .filter(Boolean)
          .map((text) => ({ text })),
      type,
      login,
      password: type === EAccountTypes.LOCAL ? password : null,
    });
  });
};


</script>

<template>
  <el-form :model="formValues" :rules="rules" ref="formRef">
    <el-form-item prop="labels">
      <el-input  placeholder="Введите метки" v-model="formValues.label" @blur="validateAndEmit" />
    </el-form-item>

    <el-form-item prop="type">
      <el-select
          v-model="formValues.type"
          @change="validateAndEmit"
          placeholder="Выберите тип"
      >
        <el-option :label="EAccountTypes.LDAP" :value="EAccountTypes.LDAP" />
        <el-option :label="EAccountTypes.LOCAL" :value="EAccountTypes.LOCAL" />
      </el-select>
    </el-form-item>

    <el-form-item
        prop="login"
        :class="formValues.type === EAccountTypes.LDAP ? 'full-width' : ''"
    >
      <el-input
          placeholder="Введите логин"
          v-model="formValues.login"
          @blur="validateAndEmit"
      />
    </el-form-item>

    <el-form-item prop="password" v-if="formValues.type === EAccountTypes.LOCAL">
      <el-input
          placeholder="Введите пароль"
          type="password"
          v-model="formValues.password"
          show-password
          @blur="validateAndEmit"
      />
    </el-form-item>

    <el-button :icon="Delete" @click="$emit('remove', account.id)" />
  </el-form>
</template>

<style scoped>
.el-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 2.5rem;
  gap: 1rem;
}

.el-form-item {
  flex: 1;
}

.el-form-item.full-width {
  grid-column: span 2;
}
</style>