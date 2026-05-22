import { redirect } from "react-router-dom";
import { getReservation, getCurrentUser } from "../services/api";

export default async function reservationLoader({ params }: any) {
  try {
    const [reservation, currentUser] = await Promise.all([
      getReservation(params.id),
      getCurrentUser(),
    ]);

    return {
      ...reservation,
      currentUserRole: currentUser?.role,
      currentUserId: currentUser?.id,
    };
  } catch (error: any) {
    if (error.status === 403 || error.status === 401) {
      throw redirect("/host");
    }
    throw error;
  }
}