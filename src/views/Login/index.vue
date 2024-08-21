<template>
    <div class="login">
        <el-form ref="formRef" :model="formData" :rules="rules">
            <el-form-item label="账号" prop="username">
                <el-input
                    v-model="formData.username"
                    placeholder="请输入账号"
                    type="text"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="formData.password"
                    placeholder="请输入密码"
                    type="password"
                    autocomplete="off"
                    @keyup.enter="doLogin"
                />
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading.submit" type="primary" @click="doLogin"
                    >登录</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup name="Login">
import { useUserStore } from '@/store/user'
const formRef = ref()
const formData = reactive({
    username: '',
    password: ''
})

const loading = reactive({
    submit: false
})

const rules = {
    username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
}

const router = useRouter()
const doLogin = async () => {
    await formRef.value.validate()
    try {
        loading.submit = true
        await useUserStore().login(formData)
        router.push('/')
    } finally {
        loading.submit = false
    }
}
</script>
<style lang="scss" scoped>
$w: 480px;
$h: 250px;

.login {
    position: relative;
    transition: all 1s ease-in-out;
    margin: 300px auto;
    width: $w;
    height: $h;
    box-sizing: border-box;
    box-shadow: 0 0 6px 6px #efefef;
    padding: 40px;

    &::before {
        z-index: -1;
        transition: all 1s ease-in-out;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        box-sizing: border-box;
        border: 2px solid #1677ff;
        border-radius: 16px;
        opacity: 0;
        clip: rect(0, 0, 0, 0);
    }
    &::after {
        z-index: -1;
        transition: all 1s ease-in-out;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        box-sizing: border-box;
        border: 2px solid #1677ff;
        border-radius: 16px;
        opacity: 0;
        clip: rect($h, $w, $h, $w);
    }

    &:hover {
        box-shadow: none;
        animation: none;
        &::before,
        &::after {
            opacity: 1;
            clip: rect(0, $w, $h, 0);
        }
    }
}
</style>
