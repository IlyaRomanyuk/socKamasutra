export const required = (value) => {
    if(value) {
        return undefined
    }
    return 'field is required' 
} 

export const maxLengthCreator = (length) => (value) => {
    if(value.length > length) {
        return `max count of symbols is ${length}`
    }
    return undefined 
} 