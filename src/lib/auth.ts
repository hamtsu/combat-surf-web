const SECRET_TOKEN = process.env.ROBLOX_API_SECRET

export function verifyAuth(authHeader: string) {
    if (!authHeader.startsWith('Bearer ')) return false
    const token = authHeader.split(' ')[1]
    return token === SECRET_TOKEN
}
