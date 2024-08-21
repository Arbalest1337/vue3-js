<template>
    <el-form
        label-position="top"
        :ref="e => (form.ref = e)"
        :rules="rules"
        :model="form.data"
        v-bind="{ ...(form?.bind ?? {}) }"
    >
        <template v-for="item in form?.options">
            <el-form-item
                :prop="item.prop"
                v-if="!item.hidden"
                :label="item.isGroup ?? item.label"
                :style="{ fontWeight: `${item.isGroup ? 'bold' : 'normal'}` }"
                v-bind="{ ...(item.labelBind ?? {}) }"
            >
                <slot name="formItem" v-bind="item">
                    <!-- group -->
                    <template v-if="item.isGroup"></template>
                    <!-- daterange -->
                    <template v-else-if="item.type === 'date'">
                        <el-date-picker
                            v-model="form.data[item.prop]"
                            type="date"
                            placeholder="请选择"
                            value-format="YYYY-MM-DD"
                            v-bind="{ ...(item?.bind ?? {}) }"
                            @change="item?.onChange"
                        />
                    </template>
                    <!-- date -->
                    <template v-else-if="item.type === 'daterange'">
                        <el-date-picker
                            v-model="form.data[item.prop]"
                            @change="item?.onChange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="YYYY-MM-DD"
                            v-bind="{ ...(item?.bind ?? {}) }"
                        />
                    </template>
                    <!-- select -->
                    <template v-else-if="item.type === 'select'">
                        <el-select
                            v-model="form.data[item.prop]"
                            :placeholder="`请选择${item.label}`"
                            v-bind="{ ...(item?.bind ?? {}) }"
                            @change="item?.onChange"
                            clearable
                        >
                            <el-option
                                v-for="option in item?.options ?? []"
                                :key="option.value"
                                :label="option.label"
                                :value="option.value"
                                v-bind="{ ...option }"
                            />
                        </el-select>
                    </template>
                    <!-- select-v2 -->
                    <template v-else-if="item.type === 'select-v2'">
                        <el-select-v2
                            v-model="form.data[item.prop]"
                            :placeholder="`请选择${item.label}`"
                            @change="item?.onChange"
                            clearable
                            :options="item.options"
                            :filterable="true"
                            v-bind="{ ...(item?.bind ?? {}) }"
                        />
                    </template>
                    <!-- multipleSelect -->
                    <template v-else-if="item.type === 'multipleSelect'">
                        <el-select
                            :multiple="true"
                            :model-value="
                                form.data?.[item.prop]?.length > 0
                                    ? form.data[item.prop].split(',').map(item => parseInt(item))
                                    : []
                            "
                            @update:model-value="
                                e => (form.data[item.prop] = e?.length ? e.join(',') : undefined)
                            "
                            :placeholder="`请选择${item.label}`"
                            v-bind="{ ...(item?.bind ?? {}) }"
                            @change="item?.onChange"
                            clearable
                        >
                            <el-option
                                v-for="option in item?.options ?? []"
                                :key="option.value"
                                :label="option.label"
                                :value="option.value"
                                v-bind="{ ...option }"
                            />
                        </el-select>
                    </template>
                    <!-- cascader -->
                    <template v-else-if="item.type === 'cascader'">
                        <el-cascader
                            v-model="form.data[item.prop]"
                            :options="item.options"
                            v-bind="{ ...(item?.bind ?? {}) }"
                            @change="item?.onChange"
                        />
                    </template>
                    <!-- upload -->
                    <template v-else-if="item.type === 'upload'">
                        <Upload
                            v-model:fileListJson="form.data[item.prop]"
                            :options="item.bind"
                            v-bind="{ ...(item?.bind ?? {}) }"
                        />
                    </template>
                    <!-- input -->
                    <template v-else>
                        <el-input
                            clearable
                            v-model="form.data[item.prop]"
                            :placeholder="`请输入${item.label}`"
                            v-bind="{ ...(item?.bind ?? {}) }"
                            @change="item?.onChange"
                        />
                    </template>
                </slot>
            </el-form-item>
        </template>
        <slot />
    </el-form>
</template>
<script setup name="FormRenderer">
import Upload from '@/components/Page/Upload/index.vue'
const props = defineProps({
    form: {
        type: Object,
        default: () => ({
            data: {},
            options: [],
            rules: [],
            ref: null,
            bind: {}
        })
    }
})

const rules = computed(() => ({
    ...Object.fromEntries(
        props.form.options
            .filter(item => item?.required !== false && item.prop)
            .map(item => [
                item.prop,
                [
                    {
                        required: true,
                        trigger: 'blur',
                        message: `请${
                            item?.type === 'upload'
                                ? '上传'
                                : ['select', 'multipleSelect', 'date', 'dateRange'].includes(
                                      item?.type
                                  )
                                ? '选择'
                                : '输入'
                        }${item.label}`
                    }
                ]
            ])
    ),
    ...(props.form.rules ?? {})
}))
</script>
<style lang="scss" scoped></style>
