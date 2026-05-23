import { cart } from "@/types/types";

const CartApi = "https://69fe01f98c70b15fa3ca1479.mockapi.io/api/v1/carts";

export async function GetCart(userId: string) {
  const res = await fetch(`${CartApi}?UserId=${userId}`);
  const data = await res.json();
  return data[0]; // mockapi بيرجع array
}

export async function editCart(id: string, UserId: string, cart: cart) {
  const res = await fetch(`${CartApi}/${id}`, {  // ✅ slash مش مسافة
    method: "PUT",  // ✅ PUT مش POST
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserId: UserId,
      items: cart.items,  // ✅ cart.items مش cart
    }),
  });
  return res.json();
}
