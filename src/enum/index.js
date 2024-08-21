const files = import.meta.glob('./modules/**/*.(ts|js)', { eager: true })
let modules = {}
Object.keys(files).forEach(key => {
    const moduleName = key.replace(/\S*\/(\w*)\.\w*$/, (str, match) => match)
    const paths = key.split('/')
    const result = paths
        .slice(2, paths.length - 1)
        .reverse()
        .reduce((prev, curr) => ({ [curr]: prev }), { [moduleName]: files[key] })
    modules = { ...modules, ...result }
})
export default modules

export const enumToOptions = enumMap => {
    return Object.entries(enumMap)
        .map(([label, value]) => ({
            label,
            value
        }))
        .filter(item => isNaN(Number(item.label)))
}
