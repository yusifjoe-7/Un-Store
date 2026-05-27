import { cart } from "@/types/types";

const CartApi = "https://69fe01f98c70b15fa3ca1479.mockapi.io/api/v1/carts";

export async function GetCart(userId: string): Promise<cart | undefined> {
  const res = await fetch(`${CartApi}?UserId=${userId}`);
  const data = await res.json();
  return data[0] as cart; // ✅ TypeScript دلوقتي عارف إن فيه id
}
export async function editCart(cartId: string, cart: cart) {
  const res = await fetch(`${CartApi}/${cartId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserId: cart.UserId,
      items: cart.items,
    }),
  });
  return res.json();
}