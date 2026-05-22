import { getCurrentUser } from "../services/api";

export default async function mainLoader() {
    try {
        const user = await getCurrentUser();
        return user;
    } catch {
        return null;
    }
}