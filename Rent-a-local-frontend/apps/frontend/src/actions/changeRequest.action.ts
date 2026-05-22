import { redirect } from "react-router-dom";
import { createChangeRequest } from "../services/api";

export async function changeRequestAction({ request }: any) {
  const formData = await request.formData();

  const credentials = {
    newStartDate: formData.get("newStartDate") as string,
    newEndDate: formData.get("newEndDate") as string,
    reservationId: Number(formData.get("reservationId")),
    userId: Number(formData.get("userId")),
  };

  if (credentials.newEndDate <= credentials.newStartDate) {
    return "La date de fin doit être après la date de début.";
  }

  try {
    await createChangeRequest(credentials);
    return redirect(`/reservations/${credentials.reservationId}`);
  } catch (error: any) {
    return error.message || "Une erreur est survenue.";
  }
}