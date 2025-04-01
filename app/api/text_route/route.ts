import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import uploadLocalFile from "@/lib/cloudinary"; // Adjust path if needed

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    console.log(file)

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save file temporarily in /tmp/
    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const tempFilePath = path.join(tempDir, `${Date.now()}-${file.size}`);
    await writeFile(tempFilePath, buffer);

    // Upload to Cloudinary using your existing function
    const response = await uploadLocalFile(tempFilePath);

    // Delete temporary file
    fs.unlinkSync(tempFilePath);

    if (!response) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({ url: response.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
