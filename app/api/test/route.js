import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

export async function GET() {
    await connectToDB();
    return NextResponse.json({ message: "MongoDB Connected!" });
}
