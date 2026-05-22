import { redirect } from "react-router-dom";
import { getReservation, getCurrentUser } from "../services/api";
 
export default async function editReservationLoader({ params }: any) {
  const [reservation, currentUser] = await Promise.all([
    getReservation(params.id),
    getCurrentUser(),
  ]);
 
  if (!currentUser || currentUser.id !== reservation.user?.id && currentUser.role !== "administrator") {
    throw redirect(`/reservations/${params.id}`);
  }
 
  // Can't edit if paid or past
  //if (reservation.paid || new Date(reservation.startDate) <= new Date()) {
  //  throw redirect(`/reservations/${params.id}`);
  //}
 
  return reservation;
}