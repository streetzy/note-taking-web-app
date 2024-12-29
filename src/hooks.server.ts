import mongoose from "mongoose";
import { MONGO_URL } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";
import { delete_session_token_cookie, set_session_token_cookie, validate_session_token } from "$lib/server/session";
import { sequence } from "@sveltejs/kit/hooks";

await mongoose.connect(MONGO_URL).then(async () => {
    console.log("DB connected");
})

const authHandle: Handle = async ( {event, resolve} ) => {
    const token = event.cookies.get("session") ?? null;
    if (token === null) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const { session, user } = await validate_session_token(token);
    console.log(session, user)
    if (session !== null) {
        set_session_token_cookie(event, token, session.expires_at);
    } else {
        delete_session_token_cookie(event);
    }

    event.locals.session = session;
    event.locals.user = user;
    return resolve(event);
}

export const handle = sequence(authHandle)