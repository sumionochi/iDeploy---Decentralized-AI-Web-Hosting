import { neon } from "@neondatabase/serverless";

import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL! || "postgresql://ideploy_owner:qDnoGXsR37iw@ep-frosty-morning-a1345cgh.ap-southeast-1.aws.neon.tech/ideploy?sslmode=require");

export const db = drizzle(sql, { schema });