export const utils = {
    sleep: (time = 1000) => new Promise(resolve => setTimeout(resolve, time)),

    confirmDelete: async (callback, options) => {
        const { content, title, ...other } = options ?? {}
        ElMessageBox.confirm(content || '确定删除这条内容？', title || '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            confirmButtonClass: 'delete-messageBox-btn confirm',
            cancelButtonClass: 'delete-messageBox-btn',
            type: 'warning',
            ...(other ?? {}),
            beforeClose: async (action, instance, done) => {
                if (action !== 'confirm') return done()
                try {
                    instance.confirmButtonLoading = true
                    await callback?.()
                    done()
                } finally {
                    instance.confirmButtonLoading = false
                }
            }
        })
    }
}
