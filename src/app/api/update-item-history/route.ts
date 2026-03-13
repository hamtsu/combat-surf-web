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
            const currentItemDoc = currentItem.get()

            if (!currentItemDoc) {
                historyBatch.set(currentItem, { players: [player1Id, player2Id], createdAt: FieldValue.serverTimestamp() })
            } else {
                historyBatch.update(currentItem, { players: FieldValue.arrayUnion(player2Id) })
            }
        } catch (error) {
            return new Response(JSON.stringify({ success: false, message: "Error while updating player 1 items", error: error }), { status: 500 });
        }

    }

    // player 2 items
    for (let index = 0; index < player2Items.length; index++) {
        try {
            const currentItem = historyCollection.doc(player2Items[index])
            const currentItemDoc = currentItem.get()

            if (!currentItemDoc) {
                historyBatch.set(currentItem, { players: [player2Id, player1Id], createdAt: FieldValue.serverTimestamp() })
            } else {
                historyBatch.update(currentItem, { players: FieldValue.arrayUnion(player1Id) })
            }
        } catch (error) {
            return new Response(JSON.stringify({ success: false, message: "Error while updating player 2 items", error: error }), { status: 500 });
        }

    }

    try {
        await historyBatch.commit()
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Error while commiting batch update", error: error }), { status: 500 });
    }
}
