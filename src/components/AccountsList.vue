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
            <h2>Учетные записи</h2>
            <el-button type="default" :icon="Plus" @click="onAdd"></el-button>
        </div>
        <div class="main-container">
            <div class="hint-container">
                <el-icon>
                    <QuestionFilled />
                </el-icon>
                <p> Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
            </div>
            <div class="accounts-form">
                <div class="accounts-header">
                    <div>Метка</div>
                    <div>Тип записи</div>
                    <div>Логин</div>
                    <div>Пароль</div>
                </div>

                <div class="accounts-body">
                    <AccountItem v-for="account in store.accounts" :key="account.id" :account="account"
                        @update="onUpdate" @remove="onRemove" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 20px;
}

.main-container {
    width: 100%;
    margin-left: 20px;
}

.hint-container {
    background-color: #eef4fa;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    min-width: 75%;
}

.accounts-form {
    padding: 8px 0px;
}

.accounts-header {
    display: grid;
    grid-template-columns: 200px 200px 200px 200px 100px;
    gap: 15px;
    font-weight: 600;
    font-size: 14px;
    color: #b5b6b6;
    padding-bottom: 10px;
}

.accounts-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.accounts-body .account-row {
    display: grid;
    grid-template-columns: 200px 200px 200px 200px 100px;
    gap: 15px;
    align-items: center;
}
</style>