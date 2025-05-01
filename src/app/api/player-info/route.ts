import { NextRequest, NextResponse } from 'next/server';
import mockUsers from '../../mockUsers.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  try {
    const lowerQuery = query.toLowerCase();

    // exact id match
    const exactIdMatches = mockUsers.filter(
      (user) => user.id.toString() === query
    );

    if (exactIdMatches.length > 0) {
      return NextResponse.json(exactIdMatches);
    }

    // partial id match or username match
    const matchedUsers = mockUsers.filter((user) => {
      return (
        user.id.toString().includes(query) ||
        user.username.toLowerCase().includes(lowerQuery)
      );
    });

    if (matchedUsers.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    }

    return NextResponse.json(matchedUsers);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
