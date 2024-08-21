import { merge } from 'lodash'
const files = import.meta.glob('./modules/**/*.(ts|js)', { eager: true })
let modules = {}
Object.keys(files).forEach(key => {
    const moduleName = key.replace(/\S*\/(\w*)\.\w*$/, (str, match) => match)
    const paths = key.split('/')
    const result = paths
        .slice(2, paths.length - 1)
        .reverse()
        .reduce((prev, curr) => ({ [curr]: prev }), { [moduleName]: files[key].default })

    modules = merge(modules, result)
})
export default modules
