import { type PostgresJsQueryResultHKT, drizzle } from "drizzle-orm/postgres-js";
import { type PgTransaction } from "drizzle-orm/pg-core";
import { type ExtractTablesWithRelations } from "drizzle-orm";
import postgres from "postgres";

import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
export type Transaction = PgTransaction<PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>
export type RawTableNames = keyof ExtractTablesWithRelations<typeof schema>