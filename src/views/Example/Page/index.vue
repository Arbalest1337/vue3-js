<template>
    <Page :page>
        <template #tableActions>
            <el-button type="primary" link>表格操作</el-button>
            <el-button type="primary">表单</el-button>
        </template>

        <template #tableItem="{ column, row }">
            <template v-if="column.label === '复杂节点建议使用模板'">
                <el-button type="primary" link>操作1</el-button>
                <el-tag type="primary">操作2</el-tag>
            </template>
        </template>
    </Page>
</template>
<script setup name="ExamplePage">
const filterer = reactive({
    options: [
        {
            label: '名称',
            prop: 'name'
        },
        {
            label: '日期',
            prop: 'date',
            type: 'date'
        },
        {
            label: '日期范围',
            type: 'daterange',
            start: {
                prop: 'startDate'
            },
            end: {
                prop: 'endDate'
            }
        },
        {
            label: '选择',
            type: 'select',
            prop: 'select',
            options: [
                {
                    label: '选项1',
                    value: 1
                },
                {
                    label: '选项2',
                    value: 2
                }
            ]
        },
        {
            label: '多选',
            type: 'multipleSelect',
            prop: 'multipleSelect',
            options: [
                {
                    label: '选项1',
                    value: 1
                },
                {
                    label: '选项2',
                    value: 2
                },
                {
                    label: '选项3',
                    value: 3
                }
            ]
        }
    ]
})

const table = reactive({
    options: [
        {
            label: '名称',
            prop: 'name'
        },
        {
            label: '简单文本的自定义渲染',
            prop: 'name',
            formatter: row => `名字是${row.name}`
        },
        {
            label: '简单节点的自定义渲染',
            prop: 'name',
            formatter: row =>
                h(
                    'el-tag',
                    {
                        type: 'warning',
                        onClick: () => {
                            console.log('on click')
                        }
                    },
                    { default: () => row.name }
                )
        },
        {
            label: '复杂节点建议使用模板'
        }
    ]
})

const { page } = usePage({
    // api:apiBus.query,
    filterer,
    table
})
</script>
<style lang="scss" scoped></style>
