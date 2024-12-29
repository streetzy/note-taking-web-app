import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { update_section_name } from "$lib/server/sections";

export const load : PageServerLoad = async ({ params, locals }) => {
    if (locals.user === null) {
        return redirect(302, "login");
    }

    return { notebook_id: params.notebook, section_id: params.section };
}

export const actions = {
    default: async ({ params, locals, request}) => {
        const form_data = await request.formData();
        const renamed_section = form_data.get("renamed-section");

        if (locals.user === null) {
            return redirect(302, "/login");
        }

        if (typeof renamed_section !== "string") {
            return fail(400, {message: "Invalid input"});
        }

        update_section_name(params.notebook, params.section, renamed_section);

        return redirect(302, `/notebooks/${params.notebook}/sections`);
    }
}