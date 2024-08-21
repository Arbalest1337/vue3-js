<template>
    <el-upload
        :file-list="fileList"
        action=""
        :http-request="doUpload"
        :before-upload="beforeUpload"
        :on-exceed="onExceed"
        :accept
        :limit
        v-bind="$attrs"
    >
        <el-button class="upload-btn" :icon="UploadFilled">点击上传</el-button>
        <template #tip v-if="$attrs.tips">
            <div class="upload-tips">
                {{ $attrs.tips }}
            </div>
        </template>
    </el-upload>
</template>
<script setup name="Upload">
import apiBus from '@/api'
import { UploadFilled } from '@element-plus/icons-vue'

const fileListJson = defineModel('fileListJson', {
    type: String,
    default: ''
})

const fileList = computed({
    get: () => (fileListJson.value ? JSON.parse(fileListJson.value) : []),
    set: val => {
        fileListJson.value = val.length ? JSON.stringify(val) : ''
    }
})

const props = defineProps({
    accept: {
        type: String,
        default: ''
    },
    maxSize: {
        type: Number,
        default: 50
    },
    limit: {
        type: Number,
        default: 1
    }
})

const doUpload = async ({ file }) => {
    const fileData = new FormData()
    fileData.append('filedata', file)
    fileData.append('filecode', file.uid)
    const res = await apiBus.sys.uploadHttps(fileData)
    fileList.value = [res, ...fileList.value]
}

const beforeUpload = ({ name, size }) => {
    const type = name.split('.').pop()
    if (props.accept.length && !props.accept.includes(type)) {
        ElMessage.error(`上传失败，请上传 ${props.accept} 类型文件`)
        return false
    }

    if (size / 1024 / 1024 > props.maxSize) {
        ElMessage.error(`上传失败，文件大小限制为${props.maxSize}MB`)
        return false
    }

    return true
}

const onExceed = () => {
    ElMessage.error(`上传失败，文件上传数量已达限制`)
}
</script>
<style lang="scss" scoped>
.upload-tips {
    font-size: 14px;
    color: #999;
    width: 100%;
}
</style>
