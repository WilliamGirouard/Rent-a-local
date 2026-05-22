import { redirect } from "react-router-dom";
import { createLocal } from "../services/api";

export async function createLocalAction({ request }: any) {
  const formData = await request.formData();
  const files = formData.getAll('images') as File[];

  if (!files || files.length === 0) return "Il faut une photo minimum.";
  if (files.some(f => f.size > 5 * 1024 * 1024)) return "Les photos doivent faire moins de 5mb chacuneé";
  if (files.length > 5) return "5 photos maximum."

  try {
    await createLocal(formData);
    return redirect("/admin");
  } catch (error: any) {
    return error.message || "Une erreur est survenue.";
  }
}