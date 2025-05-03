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
        user.id.toString().startsWith(query) ||
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

// export async function GET(req: NextRequest) {
//   const username = req.nextUrl.searchParams.get('username');
//   if (!username) {
//     return new NextResponse(JSON.stringify({ message: 'Username required' }), { status: 400 });
//   }

//   try {
//     const user = await getUserByUsername(username);

//     if (!user) {
//       return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
//     }

//     return new NextResponse(JSON.stringify(user), { status: 200 });
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ message: 'Error fetching user data' }), { status: 500 });
//   }
// }
