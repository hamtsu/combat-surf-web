import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  try {
    const lowerQuery = query.toLowerCase();

    const db = await getDb();

    // exact id match
    const sqlExactIdMatch = 'SELECT * FROM users WHERE id = ? LIMIT 1';
    const [exactIdMatches] = await db.execute(sqlExactIdMatch, [query]);

    // typing the result as an array of users
    const usersExactIdMatch = exactIdMatches as Array<{ id: number, username: string, displayName: string, level: number, clanName: string, clanTag: string, stats: object, inventory: object[] }>;

    if (usersExactIdMatch.length > 0) {
      return NextResponse.json(usersExactIdMatch);
    }
    

    // partial id match or username match
    const sqlPartialMatch = `
      SELECT * FROM users WHERE 
      id LIKE ? OR username LIKE ? LIMIT 10
    `;
    const [matchedUsers] = await db.execute(sqlPartialMatch, [
      `${query}%`, // Match if id starts with query
      `%${lowerQuery}%`, // Match if username contains the query
    ]);

    // typing the result as an array of users
    const usersMatched = matchedUsers as Array<{ id: number, username: string, displayName: string, level: number, clanName: string, clanTag: string, stats: object, inventory: object[] }>;

    if (usersMatched.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    }

    return NextResponse.json(usersMatched);
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
