<script setup>
import { Plus } from '@element-plus/icons-vue'
import AccountItem from './AccountItem.vue';
</script>

<template>
    <div>
        <div class="header">
            <h1>Учетные записи</h1>
            <el-button type="default" :icon="Plus"></el-button>
        </div>
        <div class="main-container">
            <div class="promt-container">
                <el-icon>
                    <QuestionFilled />
                </el-icon>
                <p> Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
            </div>

            <div>
                <AccountItem />
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

.promt-container {
    background-color: #eef4fa;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    min-width: 75%;
}
</style>