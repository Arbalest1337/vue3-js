<template>
    <div class="back-title">
        <el-tag type="primary" class="back" @click="onClick">
            <el-icon><ArrowLeft /></el-icon>
        </el-tag>
        <span class="text">{{ title }}</span>
    </div>
</template>
<script setup name="BackTitle">
import { ArrowLeft } from '@element-plus/icons-vue'
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    onBackTitleClick: {
        type: Function,
        default: () => {}
    }
})

const router = useRouter()
const onClick = () => {
    props.onBackTitleClick ? props.onBackTitleClick() : router.back()
}
</script>
<style lang="scss" scoped>
.back-title {
    padding: 16px 20px 0;
    box-sizing: border-box;
    display: flex;
    position: relative;
    align-items: center;
    .back {
        padding: 2px;
        margin-right: 10px;
        cursor: pointer;
    }
    .text {
        font-size: 16px;
        line-height: 16px;
        font-weight: bold;
        color: $font-color;
    }
}
</style>
