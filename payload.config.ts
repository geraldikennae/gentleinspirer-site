import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Letters } from "./collections/Letters";
import { Products } from "./collections/Products";
import { SiteSettings } from "./globals/SiteSettings";
import { HomeContent } from "./globals/HomeContent";
import { SessionsContent } from "./globals/SessionsContent";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — gentleinspirer admin",
    },
  },
  collections: [Users, Media, Letters, Products],
  globals: [SiteSettings, HomeContent, SessionsContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    // Payload only auto-syncs the schema when NODE_ENV !== 'production' — on
    // Vercel that's never true. `prodMigrations` is Payload's supported answer:
    // it runs these migrations automatically the first time the adapter
    // connects in production, so tables exist without a separate deploy step.
    // Run `npx payload migrate:create <name>` after changing a collection or
    // global, commit the new file under migrations/, and it picks it up.
    prodMigrations: migrations,
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      // Supabase (and most hosted Postgres) require SSL; the pooler in
      // particular uses a cert Node doesn't trust by default. Skipped only
      // for local dev, where DATABASE_URL points at plain localhost.
      ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
    },
  }),
  sharp,
  plugins: [
    // Vercel's filesystem is read-only/ephemeral — Payload's default local-disk
    // upload storage silently fails to persist files there. Route uploads to
    // Vercel Blob whenever a token is present (added automatically once a Blob
    // store is attached to the project); local dev keeps using disk storage.
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
});
