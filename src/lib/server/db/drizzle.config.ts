import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

export default {
	schema: "./src/lib/server/db/schema.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: process.env.SQLITE_DB_PATH || "./data/extranet.db"
	},
	out: "./src/lib/server/db/migrations"
} satisfies Config;