export async function GET() {
  try {
    const response = await fetch(
      `https://games.roblox.com/v1/games?universeIds=5584605705`
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Roblox API" }),
        {
          status: 500,
        }
      );
    }

    const data = await response.json();
    const playing = data.data?.[0]?.playing ?? 0;
    const favouriteCount = data.data[0]?.favoritedCount ?? 0;
    const visitCount = data.data[0]?.visits ?? 0;

    return Response.json({
      activePlayers: playing,
      favourites: favouriteCount,
      visits: visitCount,
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
    });
  }
}
