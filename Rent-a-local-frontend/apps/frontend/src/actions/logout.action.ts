import { redirect } from "react-router-dom";

export default async function logoutAction() {
    try{
        // Enleve le JWT token, donc n'est plus connecte
        localStorage.removeItem('token');
        return redirect("/");
    } catch(error : any) {
        console.error(error);
        return redirect("/");
    }
}