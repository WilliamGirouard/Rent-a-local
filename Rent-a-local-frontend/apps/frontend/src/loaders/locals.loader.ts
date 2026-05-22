import { getLocals } from "../services/api";

export default async function localsLoader() {
    const locals = await getLocals();
    return {locals};
}