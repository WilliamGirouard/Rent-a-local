import { redirect } from "react-router-dom";
import { loginUser } from "../services/api";


export async function loginAction({ request } : any) {
    
    const formData = await request.formData();

    const credentials = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    try {
        const data = await loginUser(credentials);
        localStorage.setItem("token", data.access_token);

        const redirectTo = localStorage.getItem("redirectAfterLogin") || "/host";
        localStorage.removeItem("redirectAfterLogin");
        return redirect(redirectTo);

    } catch (error : any) {
        if (error.status === 404 || error.status === 400) {
            return "Email or password is incorrect. Please try again."
        }
        return "Login failed. Please try again."
    }
};