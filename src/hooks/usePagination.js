export const usePagination = options => {
    const pageNum = ref(1)
    const pageSize = ref(10)
    const total = ref(0)

    const pagination = reactive({
        pageNum,
        pageSize,
        total,
        ...(options ?? {})
    })

    return {
        pagination,
        pageNum,
        pageSize,
        total
    }
}
