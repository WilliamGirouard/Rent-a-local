import { redirect } from "react-router-dom";
import { getCurrentUser, getReservations } from "../services/api";
 
export default async function reservationsLoader() {
  const user = await getCurrentUser();
 
  if (!user) {
    return redirect("/login");
  }
 
  if (user.role !== "administrator") {
    throw redirect("/host");
  }
 
  return await getReservations();
}