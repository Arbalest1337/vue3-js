const files = import.meta.glob('./modules/*.(ts|js)', { eager: true })
const modules = {}
Object.keys(files).forEach(key => {
    const moduleName = key.replace(/\S*\/(\w*)\.\w*$/, (str, match) => match)
    modules[moduleName] = files[key].default
})
export default modules
