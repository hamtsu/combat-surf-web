import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
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
            "usernames": [
              query
            ],
            "excludeBannedUsers": true
          }),
        }
      );

      if (!idRes.ok) {
        throw new Error('Invalid username');
      }

      const idData = await idRes.json();
      if (idData.data.length === 0) {
        throw new Error('Username not found')
      } else {
        userId = idData.data[0].id.toString()
      }
    } else {
      userId = query

      const res = await fetch(`https://apis.roblox.com/cloud/v2/users/${userId}`,
        {
          headers: {
            "x-api-key": process.env.OPENCLOUD_API_KEY || "",
          },
        }
      );

      if (!res.ok) {
        throw new Error('Invalid userId');
      }
      const data = await res.json();
      username = data.name;
    }

    const res = await fetch(`https://apis.roblox.com/cloud/v2/universes/${process.env.UNIVERSE_ID}/data-stores/CurrentLevel/entries/${userId}`,
      {
        headers: {
          "x-api-key": process.env.OPENCLOUD_API_KEY || "",
        },
      }
    );


    if (!res.ok) throw new Error("Failed to fetch profile");

    const data = await res.json();

    return NextResponse.json({
      userId,
      level: data.value,
      username: username ?? 'unknown',
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
