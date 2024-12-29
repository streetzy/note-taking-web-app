import { remove_notebook } from '$lib/server/notebooks';
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export const actions = {
    default: action
};

async function action(event: RequestEvent) {
    if (event.locals.user === null) {
        return redirect(302, "/login");
    }

    remove_notebook(event.locals.user.id, event.params.notebook);

    return redirect(302, "/notebooks");
}