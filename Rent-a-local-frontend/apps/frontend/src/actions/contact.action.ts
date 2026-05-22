import { redirect } from "react-router-dom";
import { createContactMail } from "../services/api";

export async function contactAction({ request }: any) {
  const formData = await request.formData();

  const credentials = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  try {
    await createContactMail({
      email: credentials.email,
      name: credentials.name,
      message: credentials.message,
    });
    return redirect("/host");
  } catch (error: any) {
    return error.message || "Email not sent, an error occurred.";
  }
}
