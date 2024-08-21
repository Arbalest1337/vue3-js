<template>
    <div v-once class="chart" ref="chartRef" :style="{ width: width, height: height }"></div>
</template>
<script setup name="Charts">
import echarts from './echarts'
import { debounce } from 'lodash-es'

const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '300px'
    },
    options: {
        type: Object,
        required: true
    }
})

onMounted(() => {
    nextTick(update)
})

const myChart = shallowRef()
const chartRef = ref()
const update = () => {
    if (!myChart.value) {
        myChart.value = echarts.init(chartRef.value)
    }
    myChart.value?.setOption(props.options)
}

watch(() => props.options, update, { deep: true })

const resizeHandler = debounce(() => myChart.value?.resize(), 200)
watchEffect(onCleanup => {
    window.addEventListener('resize', resizeHandler)
    onCleanup(() => {
        window.removeEventListener('resize', resizeHandler)
        myChart.value?.dispose()
    })
})
</script>
<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>
