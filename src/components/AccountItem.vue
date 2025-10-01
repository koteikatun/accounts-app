<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue'
import { Account } from '../types/Account'
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{ account: Account }>()
const emit = defineEmits<{
    (e: 'update', id: string, patch: Partial<Account>): void
    (e: 'remove', id: string): void
}>()
// локальная копия для редактирования
const local = reactive({
    id: props.account.id,
    rawLabels: props.account.rawLabels ?? (props.account.labels?.map(l => l.text).join(';') ?? ''),
    type: props.account.type,
    login: props.account.login,
    password: props.account.password ?? ''
})

const errors = reactive<{
    labels?: string | null;
    login?: string | null;
    password?: string | null
}>({
    labels: null,
    login: null,
    password: null
})

watch(() => props.account, (newA) => {
    local.rawLabels = newA.rawLabels ?? (newA.labels?.map(l => l.text).join(';') ?? '')
    local.type = newA.type
    local.login = newA.login
    local.password = newA.password ?? ''
}, { deep: true })

const onRemove = () => {
    emit('remove', local.id);
}

const onTypeChange = (value: string) => {
    if (value === 'LDAP') {
        local.password = ''
        emit('update', local.id, { type: 'LDAP', password: null })
    } else {
        emit('update', local.id, { type: 'Локальная', password: local.password ?? '' })
    }
}

</script>

<template>
    <div class="account-row">
        <div class="row">
            <el-input v-model="local.rawLabels" placeholder="Метки" :maxlength="50" clearable />
            <div v-if="errors.labels">{{ errors.labels }}</div>
        </div>
        <div class="row">
            <el-select v-model="local.type" placeholder="Тип записи" @change="onTypeChange">
                <el-option label="LDAP" value="LDAP" />
                <el-option label="Локальная" value="Локальная" />
            </el-select>
        </div>
        <div class="row">
            <el-input v-model="local.login" placeholder="Логин" clearable />
            <div v-if="errors.login">{{ errors.login }}</div>
        </div>
        <div class="row">
            <el-input type="password" v-model="local.password" placeholder="Пароль" clearable />
            <div v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div>
            <el-button @click="onRemove">
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
</style>