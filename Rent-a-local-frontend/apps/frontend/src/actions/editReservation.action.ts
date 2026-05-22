import { redirect } from "react-router-dom";
import { updateReservation } from "../services/api";

export async function editReservationAction({ request, params }: any) {
  const formData = await request.formData();

  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  await updateReservation(Number(params.id), { startDate, endDate });

  return redirect(`/reservations/${params.id}`);
}