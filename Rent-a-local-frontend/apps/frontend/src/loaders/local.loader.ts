import { getLocalById, getCurrentUser } from "../services/api";
import { requireAuth } from "../services/auth";

export default async function localLoader({ request, params }: any) {
  const user = await requireAuth(request);

  const local = await getLocalById(params.id);

  return { local, user };
}
