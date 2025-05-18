import type { User } from "./types";
import users from "../Dummy Data/users.json";


export const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>, callback: (status: "success" | "error", user?: User) => void): void => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    // TODO: add use cases for remember me and forgot password also change the type of formData to be universally read.

    const matchedUser = (users as User[]).find((user) => user.Email === email && user.Password === password);

    if (matchedUser) { 
        localStorage.setItem("user", JSON.stringify(matchedUser));
        // FOR TESTING ONLY
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", matchedUser.isAdmin ? "true" : "false");
        callback("success", matchedUser);
        window.location.href = "/"; 
        
        //console edits
        console.log("User found:", matchedUser);
        console.log("Login successful");
    } else {
        console.error("Invalid email or password");
        callback("error");
        postMessage("Login failed");
    }

};




