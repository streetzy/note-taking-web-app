import { invalidate_user_sessions } from "$lib/server/session";
import { update_user_password, update_user_username } from "$lib/server/user";
import { type RequestEvent, fail, redirect } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
    if (event.locals.session === null || event.locals.user === null) {
        return redirect(302, "/login");
    }

    return {
        user: event.locals.user
    };
}

export const actions = {
    default: action
};

async function action(event: RequestEvent) {
    if (event.locals.session === null || event.locals.user === null){
        return fail(401, {
            message: "Not authenticated"
        })
    }

    const form_data = await event.request.formData();
    const username = form_data.get("username");
    const password = form_data.get("password");
    const confirmed_password = form_data.get("confirm-password");

    if (typeof password !== "string" || typeof confirmed_password !== "string" || typeof username !== "string") {
        return fail(400, {
            message: "Invalid or missing fields"
        });
    }

    if (password !== confirmed_password) {
        return fail(400, {
            message: "Passwords don't match"
        })
    }

    await invalidate_user_sessions(event.locals.user.id)
    if ( username.length <= 31 || username.length >= 4 ) {
        await update_user_username(event.locals.user.id, username);
    }
    if ( password.trim().length !== 0) {
        await update_user_password(event.locals.user.id, confirmed_password);
    }

    return {
        message: "Updated information"
    }
}