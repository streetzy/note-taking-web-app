import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { get_notebook_name } from "$lib/server/notebooks";
import { user_notebook_sections } from "$lib/server/sections";

export const load : PageServerLoad = async ({ params, locals }) => {
    if (locals.user === null) {
        return redirect(302, "login");
    }

    const _notebook_name = await get_notebook_name(locals.user.id, params.notebook); 
    const notebook_sections = await user_notebook_sections(locals.user.id, params.notebook);

    return { notebook_name: _notebook_name, notebook_id: params.notebook, sections: notebook_sections } ;
}