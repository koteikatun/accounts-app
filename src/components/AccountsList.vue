<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import AccountItem from './AccountItem.vue';
import { useAccountsStore } from '../store/Accounts';

const store = useAccountsStore();

const onUpdate = (id: string, patch: any) => {
    store.updateAccount(id, patch)
}

const onAdd = () => {
    store.createAccount();
}

const onRemove = (id: string) => {
    store.removeAccount(id);
}
</script>

<template>
    <div>
        <div class="header">
            <h1>Учетные записи</h1>
            <el-button type="default" :icon="Plus" @click="onAdd"></el-button>
        </div>
        <div class="main-container">
            <div class="hint-container">
                <el-icon>
                    <QuestionFilled />
                </el-icon>
                <p> Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
            </div>

            <div class="accounts-list">
                <AccountItem v-for="account in store.accounts" :key="account.id" :account="account" @update="onUpdate"
                    @remove="onRemove" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    gap: 20px;
}

.main-container {
    width: 100%;
}

.hint-container {
    background-color: #eef4fa;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    min-width: 75%;
}

.accounts-list {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>