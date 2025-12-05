import { NextRequest } from "next/server";
import { initDataSource } from "@/lib/typeorm/data-source";
import { User } from "@/entities/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const ds = await initDataSource();
    const repo = ds.getRepository(User);

    // check existing email
    const existing = await repo.findOne({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already in use" }), { status: 409, headers: { "Content-Type": "application/json" } });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = repo.create({ name, email, password: hashed });
    await repo.save(user);

    return new Response(JSON.stringify({ ok: true, id: (user as any).id }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[register] error", msg);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
