import { camelCase, snakeCase } from 'lodash-es'

export const snakeToCamel = o => {
    if (o === null || typeof o !== 'object') return o
    if (Array.isArray(o)) return o.map(snakeToCamel)
    return Object.fromEntries(
        Object.entries(o).map(([key, value]) => [camelCase(key), snakeToCamel(value)])
    )
}

export const camelToSnake = o => {
    if (o === null || typeof o !== 'object') return o
    if (Array.isArray(o)) return o.map(camelToSnake)
    return Object.fromEntries(
        Object.entries(o).map(([key, value]) => [snakeCase(key), camelToSnake(value)])
    )
}
