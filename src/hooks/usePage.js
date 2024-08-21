import { usePagination } from '@/hooks/usePagination'
import { reactiveComputed } from '@vueuse/core'
import { merge } from 'lodash'

export const usePage = options => {
    const { pagination } = usePagination({
        onPageChange: () => {
            page.query()
        },
        onSizeChange: () => {
            page.filterer.onSearch()
        }
    })

    const onSearch = () => {
        page.pagination.pageNum = 1
        page.query()
    }

    const onReset = () => {
        page.filterer.data = {}
        page.filterer.onSearch()
    }

    const onSelectionChange = (e, row) => {
        page.table.selected = e
    }

    const onSortChange = e => {
        const { prop, order } = e
        page.table.sort = {
            sortKey: order ? prop : undefined,
            sortType: order ? (order === 'ascending' ? 1 : 2) : undefined
        }
        page.filterer.onSearch()
    }

    const filterer = reactive({
        data: {},
        options: [],
        onSearch,
        onReset
    })
    const selected = ref([])
    const table = reactive({
        bind: {
            currentRowKey: 'id',
            rowKey: 'id'
        },
        selected,
        ref: null,
        data: [],
        loading: false,
        options: [],
        sort: {
            sortKey: undefined,
            sortType: undefined
        },
        onSelectionChange,
        onSortChange
    })

    const queryParams = reactiveComputed(() => ({
        ...merge(
            {
                pageSize: pagination.pageSize,
                pageNum: pagination.pageNum,
                ...table.sort,
                ...filterer.data
            },
            options.params
        )
    }))

    const query = async () => {
        try {
            page.table.loading = true
            const { list, total } = await options?.api?.(page.queryParams)
            page.table.data = [...(list ?? [])]
            page.pagination.total = total
        } finally {
            page.table.loading = false
        }
    }

    const page = reactiveComputed(() => ({
        ...merge(
            {
                query,
                queryParams,
                filterer,
                table,
                pagination
            },
            options
        )
    }))

    return {
        page,
        onReset,
        onSearch,
        selected
    }
}
