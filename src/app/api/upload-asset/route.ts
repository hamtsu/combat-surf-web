import { adminAuth } from "@/lib/firebaseAdmin";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
    },
});

const MAX_SIZE = 5 * 1024 * 1024; // 5mb
const ALLOWED_TYPES = {
    "image/png": "png", "image/jpeg": "jpeg", "image/gif": "gif", "image/webp": "webp"
}

export async function POST(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    if (decoded?.claims?.groupRank < 2 || !decoded?.claims?.authenticated) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { assetType, mime, fileSize } = await req.json();

    if (fileSize > MAX_SIZE) {
        return new Response("File too large. (max 5mb)", { status: 400 });
    }

    const ext = ALLOWED_TYPES[mime as keyof typeof ALLOWED_TYPES];

    if (!ext) {
        return Response.json({ error: "Invalid file type. Allowed types: PNG, JPG, JPEG, GIF, WEBP" }, { status: 400 });
    }

    if (assetType !== "banner" && assetType !== "background") {
        return Response.json({ error: "Invalid asset type" }, { status: 400 });
    }

    const key = `users/${uid}/${assetType}.${ext}`;
    const publicUrl = `https://assets.combat.surf/${key}`;
    
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
        ContentType: mime,  
        ContentLength: fileSize,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
        expiresIn: 60,
    });

    return Response.json({ uploadUrl, publicUrl });
}
