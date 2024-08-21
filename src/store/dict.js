import apiBus from '@/api'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useDictStore = defineStore('dict', () => {
    const dictData = useStorage('dictData', [])

    const dict = computed(() => {
        const obj = {}
        dictData.value.forEach(item => {
            obj[item.name] = item
            obj[item.code] = item
        })
        return obj
    })

    const dictToOption = ({ name, code, childrens }) => {
        let obj = {
            label: name,
            value: code
        }
        if (childrens?.length > 0) {
            obj.children = childrens.map(dictToOption)
        }
        return obj
    }

    const dictOptions = computed(() =>
        Object.fromEntries(
            Object.entries(dict.value).map(([key, value]) => [
                key,
                value.childrens?.map(dictToOption)
            ])
        )
    )

    const dictToMap = arr => {
        let obj = {}
        arr?.forEach(({ label, value, children }) => {
            obj[value] = label
            obj[label] = value
            if (children?.length) {
                obj.children = {
                    ...(obj.children ?? {}),
                    ...dictToMap(children)
                }
            }
        })
        return obj
    }

    const dictMap = computed(() => {
        const res = {}
        Object.entries(dictOptions.value).forEach(([key, value]) => {
            res[key] = dictToMap(value)
        })
        return res
    })

    const queryAll = async () => {
        const res = await apiBus.system.config.dict.all()
        dictData.value = [...(res ?? [])]
    }

    const unitOptions = num =>
        [...new Array(num ?? 0)].map((_item, i) => ({
            label: `${i + 1}单元`,
            value: i + 1
        }))

    const floorOptions = num =>
        [...new Array(num ?? 0)].map((_item, i) => ({
            label: `${i + 1}楼`,
            value: i + 1
        }))

    // 获取所有企业
    const allEnterprise = ref([])
    const queryAllEnterprise = async () => {
        const { data } = await apiBus.bi.queryAllEnterprise()
        allEnterprise.value = [...(data ?? [])].map(item => ({
            ...item,
            label: item.name,
            value: item.eid,
            enterpriseName: item.name
        }))
    }

    // 已入驻可监控的企业
    const settledInEnterprise = ref([])
    const querySettledInEnterprise = async () => {
        const res = await apiBus.settledIn.monitor.enterprise.settledInEnterprise()
        settledInEnterprise.value = [...(res ?? [])].map(item => ({
            ...item,
            label: item.leaseHolder,
            value: item.eid,
            enterpriseName: item.leaseHolder
        }))
    }

    // 企业监测 风险等级 维度属性
    const getRiskProperty = async () => {
        const res = await apiBus.settledIn.monitor.pushConfig.config()
        dictData.value = [
            ...dictData.value,
            {
                name: '监控维度',
                code: 'monitor_property',
                childrens: [...(res ?? [])]
            }
        ]
    }
    return {
        queryAll,
        dictData,
        dict,
        dictOptions,
        dictMap,
        unitOptions,
        floorOptions,
        allEnterprise,
        queryAllEnterprise,
        settledInEnterprise,
        querySettledInEnterprise,
        getRiskProperty
    }
})
