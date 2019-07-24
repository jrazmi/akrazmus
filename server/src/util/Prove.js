export const prove = (promise) => {
    return promise.then(data => [null, data]).catch(err => [err])
}