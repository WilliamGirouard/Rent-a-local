import { redirect } from "react-router-dom";
import { getCurrentUser, getChangeRequests, getUsers } from "../services/api";

export default async function adminDashboardLoader() {
  const user = await getCurrentUser();

 if (!user) {
    return redirect("/login");
  }
   if (user.role !== "administrator") {
    throw redirect("/host");
  }

  const changeRequests = await getChangeRequests();
  const users = await getUsers();     

  return { user, changeRequests, users };
}

