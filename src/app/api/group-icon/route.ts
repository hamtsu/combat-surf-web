import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clanId = searchParams.get('clanId');

  if (!clanId) {
    return NextResponse.json({ error: 'Missing clanId parameter' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://thumbnails.roblox.com/v1/groups/icons?groupIds=${clanId}&size=420x420&format=Png&isCircular=false`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch group icon');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
