import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !verifyAuth(authHeader)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userData = await req.json()
    const db = await getDb()

    try {
        const sql = `
            INSERT INTO users (id, username, displayName, level, clanName, clanTag, careerWins, totalWins)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                id = VALUES(id),
                displayName = VALUES(displayName),
                level = VALUES(level),
                clanName = VALUES(clanName),
                clanTag = VALUES(clanTag),
                careerWins = VALUES(careerWins),
                totalWins = VALUES(totalWins)
        `
        const values = [
            userData.id,
            userData.username,
            userData.displayName,
            userData.level,
            userData.clanName,
            userData.clanTag,
            userData.stats.career,
            userData.stats.wins
        ]

        await db.execute(sql, values)

        return NextResponse.json({ message: 'User upserted' })
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ error: err.message || 'Unknown DB error' }, { status: 500 })
    }
}
