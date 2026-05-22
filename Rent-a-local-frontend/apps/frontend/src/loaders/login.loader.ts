import { redirect } from "react-router-dom";
import { getCurrentUser } from "../services/api";

export default async function loginLoader() {
  try {
    await getCurrentUser();
    return redirect("/host");
  } catch (error: any) {
    return null;
  }
}