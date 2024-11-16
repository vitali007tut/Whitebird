export const addLike = (postId: number) => {
    let arr: number[] = [postId]
    if (localStorage.getItem('favorite posts')) {
        const str = localStorage.getItem('favorite posts')
        const array: number[] = JSON.parse(str??'[]')
        arr.push(...array)
    }
    localStorage.setItem('favorite posts', JSON.stringify(arr))
}

export const removeLike = (postId: number) => {
    const arr: number[] = JSON.parse(localStorage.getItem('favorite posts')??'')
    const result = arr.filter(item => item !== postId)
    localStorage.setItem('favorite posts', JSON.stringify(result))
}

export const isFavorite = (postId: number): boolean => {
    const str = localStorage.getItem('favorite posts')
    const array: number[] = JSON.parse(str??'[]')
    return array.some(item => item === postId)
}

export const getFavotiteArray = (): number[] => {
    const str = localStorage.getItem('favorite posts')
    // const array: number[] = JSON.parse(str??'[]')
    return JSON.parse(str??'[]')
}