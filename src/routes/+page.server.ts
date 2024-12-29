import type { PageServerLoadEvent } from "./$types";

export function load(event: PageServerLoadEvent) {
    if (event.locals.session !== null || event.locals.user !== null) {
        return {
            user: event.locals.user
        }
    }

    return {};
}