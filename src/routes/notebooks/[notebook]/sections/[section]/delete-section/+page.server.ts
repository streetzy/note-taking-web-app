import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { remove_section, update_section_name } from "$lib/server/sections";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (locals.user === null) {
    return redirect(302, "/login");
  }

  return { notebook_id: params.notebook, section_id: params.section };
};

export const actions = {
  default: async ({ params, locals, request }) => {
    if (locals.user === null) {
      return redirect(302, "/login");
    }

    await remove_section(params.notebook, params.section);

    return redirect(302, `/notebooks/${params.notebook}/sections`);
  },
};
