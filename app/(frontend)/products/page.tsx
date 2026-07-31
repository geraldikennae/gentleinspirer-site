import { getPayloadClient } from "@/lib/payload";
import { getProductsContent } from "@/lib/content";
import { ProductsGrid, type ProductSummary } from "@/components/site/ProductsGrid";

export const dynamic = "force-dynamic";

export default async function Products() {
  const payload = await getPayloadClient();
  const [{ docs }, content] = await Promise.all([
    payload.find({
      collection: "products",
      sort: "-createdAt",
      limit: 100,
      depth: 1,
    }),
    getProductsContent(),
  ]);

  const products: ProductSummary[] = docs.map((p) => ({
    id: String(p.id),
    format: p.format,
    title: p.title,
    blurb: p.blurb ?? undefined,
    cover: typeof p.cover === "object" && p.cover?.url ? p.cover.url : undefined,
    amounts: { USD: p.priceUSD ?? null, GBP: p.priceGBP ?? null, NGN: null },
  }));

  return <ProductsGrid products={products} content={content} />;
}
