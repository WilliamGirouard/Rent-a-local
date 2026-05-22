import { redirect } from "react-router-dom";
import { getCurrentUser } from "./api";

export async function requireAuth(request?: any) {
  try {
    return await getCurrentUser();
  } catch (error: any) {
    if (error.status !== 401) {
      throw error;
    }
    throw redirect("/signin");
  }
}