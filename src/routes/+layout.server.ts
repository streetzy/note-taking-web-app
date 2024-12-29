import type { LayoutServerLoadEvent } from "./$types";

export function load(event: LayoutServerLoadEvent) {
    if (event.locals.session !== null || event.locals.user !== null) {
        return {
            user: event.locals.user
        }
    }

    return {};
}