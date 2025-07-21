import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  // TEMP MOCK DATA UNTIL DATASTORE IS WORKING
  // ALSO ADD COLOURED CLAN TAGS
 
  const data = {
    players: [
      { name: "ssomma77", career: 106159, level: 3059, clan: "[666]", id: "6029420122", wins: 100 },
      { name: "curey437", career: 43250, level: 1687, clan: "[666]", id: "7106763803", wins: 100 },
      { name: "lwhyjc", career: 35699, level: 1511, clan: "[WERAPE]", id: "602273673", wins: 100 },
      { name: "YemBeSwaggin", career: 85799, level: 1509, clan: "[MEOW]", id: "1770831133", wins: 100 },
      { name: "Smellier", career: 44848, level: 1454, clan: "[666]", id: "22794745", wins: 100 }
    ], clans: [
      { name: "auto strafe mafia", tag: "[EGO]", id: 14135379, wins: 4344 },
      { name: "6 6 6hatred", id: 35270333, tag: "[666]", wins: 4151 },
      { name: "glory2plagues", id: 14850663, tag: "[GLORY2]", wins: 2308 },
      { name: "专", id: 35826755, tag: "[D1]", wins: 2275 },
      { name: ":3 Colon Three", id: 35773400, tag: "[MEOW]", wins: 2102 },
    ]
  };

  return NextResponse.json(data);
}
