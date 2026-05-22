import { requireAuth } from "../services/auth";
import { getMyReservations } from "../services/api";

export default async function hostLoader({ request }: any) {
  const user = await requireAuth(request);
  const reservations = await getMyReservations();

  return {
    user,
    reservations,
  };
}