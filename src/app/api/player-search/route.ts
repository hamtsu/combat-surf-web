import { NextRequest, NextResponse } from 'next/server';

const usernameCache: Record<string, { userId: string; username: string; cachedAt: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 mins

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  const now = Date.now();
  const cached = usernameCache[query];

  if (cached && now - cached.cachedAt < CACHE_TTL) {
    return NextResponse.json({
      userId: cached.userId,
      username: cached.username,
      level: 'cached',
    });
  }

  try {
    let userId: string | null = null;
    let username: string | null = null;

    if (isNaN(Number(query))) {
      username = query;

      const idRes = await fetch(
        `https://users.roblox.com/v1/usernames/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usernames: [query],
            excludeBannedUsers: true,
          }),
        }
      );

      if (!idRes.ok) throw new Error('Invalid username');

      const idData = await idRes.json();
      if (!idData.data || idData.data.length === 0) {
        throw new Error('Username not found');
      }

      userId = idData.data[0].id.toString();
      username = idData.data[0].name;
    } else {
      userId = query;

      const res = await fetch(
        `https://apis.roblox.com/cloud/v2/users/${userId}`,
        {
          headers: {
            'x-api-key': process.env.OPENCLOUD_API_KEY || '',
          },
        }
      );

      if (!res.ok) throw new Error('Invalid userId');
      const data = await res.json();
      username = data.name;
    }

    const levelRes = await fetch(
      `https://apis.roblox.com/cloud/v2/universes/${process.env.UNIVERSE_ID}/data-stores/CurrentLevel/entries/${userId}`,
      {
        headers: {
          'x-api-key': process.env.OPENCLOUD_API_KEY || '',
        },
      }
    );

    if (!levelRes.ok) throw new Error('Failed to fetch profile');

    const levelData = await levelRes.json();

    // cache both username and id
    if (userId !== null && username !== null) {
      usernameCache[query] = { userId, username, cachedAt: now };
      usernameCache[userId] = { userId, username, cachedAt: now };
    }

    return NextResponse.json({
      userId,
      username,
      level: levelData.value ?? levelData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
