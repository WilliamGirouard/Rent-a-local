import { redirect } from "react-router-dom";
import { registerUser } from "../services/api";


export async function registerAction({request}: any) {
    const formData = await request.formData();

    const credentials = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string
    };

    if (credentials.password !== credentials.confirmPassword) {
        return "Passwords do not match";
    }

    try {
        await registerUser({ 
            firstName:credentials.firstName,
            lastName:credentials.lastName,
            email:credentials.email,
            password:credentials.password
        });
        return redirect("/signin")
    } catch (error : any) {
        return error.message || "Registration failed.";
    }
    
}