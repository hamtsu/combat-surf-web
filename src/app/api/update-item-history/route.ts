import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
    const { player1Id, player2Id, player1Items, player2Items } = await req.json();
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return new Response("Unauthorized", { status: 401 });

    const token = authHeader.split("Bearer ")[1];

    // if (token !== process.env.ITEM_HISTORY_SECRET) {
    //     return new Response("Unauthorized", { status: 401 });
    // }

    if (token !== "123") {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!player1Id || !player2Id) {
        return new Response(JSON.stringify({ success: false, message: "Missing Player IDs" }), { status: 400 });
    }

    if (!player1Items || !player2Items) {
        return new Response(JSON.stringify({ success: false, message: "No player inventories supplied." }), { status: 400 });
    }


    const historyCollection = db.collection("itemHistory")
    const historyBatch = db.batch()

    // Player 1 Items
    for (let index = 0; index < player1Items.length; index++) {
        try {
            const currentItem = historyCollection.doc(player1Items[index])
            const currentItemDoc = await currentItem.get()

            if (!currentItemDoc.exists) {
                historyBatch.set(currentItem, {
                    players: [
                        { playerId: player1Id, timestamp: Date.now() },
                        { playerId: player2Id, timestamp: Date.now() }
                    ],
                    createdAt: FieldValue.serverTimestamp()
                })
            } else {
                const currentPlayers = currentItemDoc.data()?.players || [];
                historyBatch.update(currentItem, {
                    players: [
                        ...currentPlayers,
                        { playerId: player2Id, timestamp: Date.now() }
                    ]
                });
            }
        } catch (error: any) {
            return new Response(JSON.stringify({ success: false, message: "Error while updating player 1 items", error: error.message }), { status: 500 });
        }

    }

    // player 2 items
    for (let index = 0; index < player2Items.length; index++) {
        try {
            const currentItem = historyCollection.doc(player2Items[index])
            const currentItemDoc = await currentItem.get()

            if (!currentItemDoc.exists) {
                historyBatch.set(currentItem, {
                    players: [
                        { playerId: player2Id, timestamp: Date.now() },
                        { playerId: player1Id, timestamp: Date.now() }
                    ],
                    createdAt: FieldValue.serverTimestamp()
                })
            } else {
                const currentPlayers = currentItemDoc.data()?.players || [];
                historyBatch.update(currentItem, {
                    players: [
                        ...currentPlayers,
                        { playerId: player1Id, timestamp: Date.now() }
                    ]
                });
            }
        } catch (error: any) {
            return new Response(JSON.stringify({ success: false, message: "Error while updating player 2 items", error: error.message }), { status: 500 });
        }

    }

    try {
        await historyBatch.commit()
        return new Response(JSON.stringify({ success: true }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Error while commiting batch update", error: error }), { status: 500 });
    }
}
