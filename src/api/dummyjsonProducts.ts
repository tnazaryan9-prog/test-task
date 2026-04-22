import { axiosService } from "@/api/axiosService";

const CATEGORY_LIST_PATH = "/products/category-list";
const PRODUCTS_ADD_PATH = "/products/add";

export function formatProductCategoryLabel(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

let categoryListCache: string[] | null = null;
let categoryListInFlight: Promise<string[]> | null = null;

/** GET: список категорий продуктов — результат кэшируется для повторного использования в приложении. */
export function fetchProductCategoryList(): Promise<string[]> {
  if (categoryListCache) {
    return Promise.resolve(categoryListCache);
  }
  if (categoryListInFlight) {
    return categoryListInFlight;
  }
  categoryListInFlight = axiosService
    .get<string[]>(CATEGORY_LIST_PATH)
    .then((res) => res.data)
    .then((list) => {
      categoryListCache = list;
      return list;
    })
    .catch(() => {
      throw new Error("Could not load workplace categories");
    })
    .finally(() => {
      categoryListInFlight = null;
    });
  return categoryListInFlight;
}

/** Очищает кэш списка категорий в памяти (например, для тестов). */
export function clearProductCategoryListCache(): void {
  categoryListCache = null;
}

export type AddDummyProductBody = {
  title: string;
};

export type AddDummyProductResponse = {
  id: number;
  title: string;
  [key: string]: unknown;
};

/** POST: добавить товар (DummyJSON имитирует создание). */
export async function addDummyProduct(
  body: AddDummyProductBody,
): Promise<AddDummyProductResponse> {
  try {
    const { data } = await axiosService.post<AddDummyProductResponse>(
      PRODUCTS_ADD_PATH,
      body,
    );
    return data;
  } catch {
    throw new Error("Could not submit application");
  }
}
