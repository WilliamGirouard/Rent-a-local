import { redirect } from "react-router-dom";
import { getCurrentUser } from "../services/api";

export default async function createLocalLoader() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/signin");
  }

  if (user.role !== "administrator") {
    throw redirect("/host");
  }

  return { user };
}