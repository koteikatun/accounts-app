<script setup lang="ts">
</script>

<template>
    <div class="account-row">
        <div class="row">
            <el-input placeholder="Метки" />
            <div>ошибка</div>
        </div>
        <div class="row">
            <el-select placeholder="Тип записи">
                <el-option label="LDAP" value="LDAP" />
                <el-option label="Локальная" value="Локальная" />
            </el-select>
        </div>
        <div class="row">
            <el-input placeholder="Логин" />
            <div>ошибка</div>
        </div>
        <div class="row">
            <el-input placeholder="Пароль" />
            <div>ошибка</div>
        </div>
        <div>
            <el-button>
                <el-icon>
                    <Delete />
                </el-icon>
            </el-button>
        </div>
    </div>
</template>

<style scoped>
.account-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.account-row .el-input,
.account-row .el-select {
    max-width: 200px;
}

.invalid .el-input__inner {
    border-color: #f56c6c !important;
}
</style>