import { fail, type RequestEvent } from '@sveltejs/kit';
import { check_email_availability, verify_email_input } from '$lib/server/email';
import { create_user, verify_username_input } from '$lib/server/user';
import { create_session, set_session_token_cookie } from '$lib/server/session';
import { Session } from '$lib/models/models.js';

export const actions = {
    default: action
};

async function action(event: RequestEvent) {
    const form_data = await event.request.formData();
    const email = form_data.get("email");
    const username = form_data.get("username");
    const password = form_data.get("password");

    if (typeof email !== "string" || typeof username !== "string" || typeof password !== "string") {
        return fail(400, {
            message: "Invalid or missing fields"
        });
    }

    if (email === "" || password === "" || username === "") {
        return fail(400, {
            message: "Please enter the required information"
        });
    }

    if (!verify_email_input(email)) {
        return fail(400, {
            message: "Invalid email"
        });
    }

    const email_available = await check_email_availability(email)
    if (!email_available) {
        return fail(400, {
            message: "Email already in use"
        })
    }

    if(!verify_username_input(username)) {
        return fail(400, {
            message: "Invalid username"
        })
    }

    const user = await create_user(email, username, password);
    const _session = await create_session(user.id.toHexString());
    // const session_token = await Session.findById()
    // set_session_token_cookie(event, session_token, new Date(_session.expires_at));
}