import { create_notebook } from '$lib/server/notebooks.js';
import { create_section } from '$lib/server/sections';
import { redirect, fail, type RequestEvent, type Action } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load : PageServerLoad = async ({ params, locals }) => {
    if (locals.user === null) {
        return redirect(302, "login");
    }

    return { notebook_id: params.notebook } ;
}

export const actions = {
    default: async ({ request, params, locals }) => {
        if (locals.session === null || locals.user === null){
            return fail(401, {
                message: "Not authenticated"
            })
        }
    
        const form_data = await request.formData();
        const section_name = form_data.get("section-name");
    
        if (typeof section_name !== "string") {
            return fail(400, {
                message: "Invalid or missing fields"
            });
        }
    
        if (section_name.length === 0) {
            return fail(400, {
                message: "Section must have a name"
            });
        }
    
        await create_section(section_name, params.notebook);
    
        return redirect(302, `/notebooks/${params.notebook}/sections`);
    }
};