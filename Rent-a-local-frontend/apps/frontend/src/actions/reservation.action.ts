import { redirect } from "react-router-dom";
import { createReservation } from "../services/api";

export async function reservationAction({ request, params }: any) {
  const formData = await request.formData();

  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const userId = Number(formData.get("userId"));
  const localId = Number(params.id);

  try {
    await createReservation({ startDate, endDate, userId, localId });
    return redirect("/host");
  } catch (error: any) {
    return error.message || "Reservation failed." ;
  }
}