<template>
    <div class="filterer">
        <Title v-if="filterer.title !== false" :title="filterer.title ?? '筛选查询'">
            <template #titleActions>
                <slot name="filtererActions">
                    <el-button
                        size="large"
                        type="primary"
                        link
                        @click="filterer?.onReset"
                        :icon="RefreshLeft"
                        >重置</el-button
                    >
                    <el-button size="large" type="primary" @click="filterer?.onSearch">
                        查询
                    </el-button>
                    <slot name="filtererExtraActions"></slot>
                </slot>
            </template>
        </Title>
        <el-form :inline="true">
            <template v-for="item in filterer?.options ?? []">
                <slot name="filtererItem" v-bind="item">
                    <el-form-item
                        :label="item.label"
                        :class="{ range: item.type?.includes('range') }"
                    >
                        <!-- date -->
                        <template v-if="item.type === 'date'">
                            <el-date-picker
                                v-model="filterer.data[item.prop]"
                                type="date"
                                placeholder="请选择"
                                value-format="YYYY-MM-DD"
                                v-bind="{ ...(item?.bind ?? {}) }"
                                @change="item?.onChange"
                            />
                        </template>
                        <!-- daterange -->
                        <template v-else-if="item.type === 'daterange'">
                            <el-date-picker
                                v-model="filterer.data[item.start.prop]"
                                type="date"
                                placeholder="开始"
                                value-format="YYYY-MM-DD"
                                v-bind="{ ...(item?.start.bind ?? {}) }"
                                :disabledDate="
                                    time =>
                                        filterer.data[item.end.prop]
                                            ? time.getTime() >
                                              new Date(filterer.data[item.end.prop]).getTime()
                                            : false
                                "
                                @change="item?.start.onChange"
                            />
                            <span style="padding: 0 5px">至</span>
                            <el-date-picker
                                v-model="filterer.data[item.end.prop]"
                                type="date"
                                placeholder="结束"
                                value-format="YYYY-MM-DD"
                                v-bind="{ ...(item?.end.bind ?? {}) }"
                                @change="item?.end.onChange"
                                :disabledDate="
                                    time =>
                                        filterer.data[item.start.prop]
                                            ? time.getTime() <
                                              new Date(filterer.data[item.start.prop]).getTime()
                                            : false
                                "
                            />
                        </template>
                        <!-- range -->
                        <template v-else-if="item.type === 'range'">
                            <div style="display: flex; flex-wrap: nowrap">
                                <el-input
                                    clearable
                                    v-model="filterer.data[item.min.prop]"
                                    :placeholder="`请输入最小值`"
                                    v-bind="{ ...(item?.min.bind ?? {}) }"
                                    @change="item?.min.onChange"
                                />
                                <span style="padding: 0 5px">~</span>
                                <el-input
                                    clearable
                                    v-model="filterer.data[item.max.prop]"
                                    :placeholder="`请输入最大值`"
                                    v-bind="{ ...(item?.max.bind ?? {}) }"
                                    @change="item?.max.onChange"
                                />
                            </div>
                        </template>
                        <!-- select -->
                        <template v-else-if="item.type === 'select'">
                            <el-select
                                clearable
                                v-model="filterer.data[item.prop]"
                                :placeholder="`请选择${item.label}`"
                                v-bind="{ ...(item?.bind ?? {}) }"
                                @change="item?.onChange"
                            >
                                <el-option
                                    v-for="option in item?.options ?? []"
                                    :key="option.value"
                                    :label="option.label"
                                    :value="option.value"
                                />
                            </el-select>
                        </template>
                        <!-- multipleSelect -->
                        <template v-else-if="item.type === 'multipleSelect'">
                            <el-select
                                clearable
                                :multiple="true"
                                collapse-tags
                                :model-value="
                                    filterer.data?.[item.prop]?.length > 0
                                        ? filterer.data[item.prop]
                                              .split(',')
                                              .map(item => parseInt(item))
                                        : []
                                "
                                @update:model-value="
                                    e =>
                                        (filterer.data[item.prop] = e?.length
                                            ? e.join(',')
                                            : undefined)
                                "
                                :placeholder="`请选择${item.label}`"
                                v-bind="{ ...(item?.bind ?? {}) }"
                                @change="item?.onChange"
                            >
                                <el-option
                                    v-for="option in item?.options ?? []"
                                    :key="option.value"
                                    :label="option.label"
                                    :value="option.value"
                                />
                            </el-select>
                        </template>
                        <!-- input -->
                        <template v-else>
                            <el-input
                                clearable
                                v-model="filterer.data[item.prop]"
                                :placeholder="`请输入${item.label}`"
                                v-bind="{ ...(item?.bind ?? {}) }"
                                @change="item?.onChange"
                            />
                        </template>
                    </el-form-item>
                </slot>
            </template>
        </el-form>
    </div>
</template>
<script setup name="Filterer">
import { RefreshLeft } from '@element-plus/icons-vue'
const props = defineProps({
    filterer: {
        type: Object,
        default: () => ({})
    }
})
</script>
<style lang="scss" scoped>
.el-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 40px;
    row-gap: 0;

    ::v-deep(.el-select__wrapper) {
        min-width: 155px;
    }
    .el-form-item {
        margin: 0 0 20px 0;
        align-items: center;
        flex: 0 0 calc((100% - 160px) / 4);
        min-width: 300px;
        &.range {
            ::v-deep(.el-form-item__content) {
                flex-wrap: nowrap;
            }
        }
    }
}
</style>
