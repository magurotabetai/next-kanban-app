import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const dbClientSingleton = () => {
  return drizzle(client, { schema });
};

declare global {
  var db: undefined | ReturnType<typeof dbClientSingleton>;
}

const db = globalThis.db ?? dbClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.db = db;
