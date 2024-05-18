export const capitalize = (word: string) => {
    if (word.split(' ').length > 1) {
        return word.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    } else {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}