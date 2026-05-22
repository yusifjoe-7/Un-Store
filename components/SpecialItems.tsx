import InfiniteScroll from "./InfiniteScroll";
import type { Product } from "@/types/types";

const LIMIT = 10;
const EXCLUDED_CATEGORIES = [
  "furniture", "groceries", "kitchen-accessories", "laptops",
  "motorcycle", "smartphones", "tablets", "vehicle"
];

async function getInitialProducts() {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=0`, {
      cache: 'no-store',
    });
    return res.json();
  } catch (err) {
    console.error(err);
  }
}

async function SpecialItems() {
  const data = await getInitialProducts();
  const filtered: Product[] = (data?.products ?? []).filter(
    (item: Product) => !EXCLUDED_CATEGORIES.includes(item.category)
  );

  return (
    <InfiniteScroll
      initialProducts={filtered}
      initialSkip={LIMIT}
      total={data?.total ?? 0}
    />
  );
}

export default SpecialItems;