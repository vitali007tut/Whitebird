export const addFavorite = (postId: number) => {
    let arr: number[] = [postId]
    if (localStorage.getItem('favorite posts')) {
        const str = localStorage.getItem('favorite posts')
        const array: number[] = JSON.parse(str??'[]')
        arr.push(...array)
    }
    localStorage.setItem('favorite posts', JSON.stringify(arr))
}

export const removeFavorite = (postId: number) => {
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
    return JSON.parse(str??'[]')
}

export type TLike = {
    postId: number, 
    like: boolean | undefined,
}

export const setLike = ({postId, like}: TLike) => {
    const str = localStorage.getItem('likes by posts')
    const obj = JSON.parse(str??'{}')
    if (String(like) === 'undefined') {
        delete obj[postId]
    } else {
        obj[postId] = like
    }
    localStorage.setItem('likes by posts', JSON.stringify(obj))
}

export const getLikeArray = (): TLike[] => {
    const str = localStorage.getItem('likes by posts')
    return JSON.parse(str??'[]')
}

export const getLikeStatus = (id: number, like: boolean): boolean => {
    const str = localStorage.getItem('likes by posts')
    const obj: TLike[] = JSON.parse(str??'[]')
    if (String(obj[id]) === 'undefined') return false;
    if (like && obj[id]) return true
    if (!like && !obj[id]) return true
    return false
}