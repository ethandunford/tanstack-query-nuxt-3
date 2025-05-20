export function timestamp(str) {
    const date = new Date().toISOString()
    console.log(`[${date}]: ${str}`)
}
