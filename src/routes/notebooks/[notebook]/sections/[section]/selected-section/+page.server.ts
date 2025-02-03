import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { get_notebook_name } from "$lib/server/notebooks";
import { get_section_name } from "$lib/server/sections";
import { create_page, notebook_section_pages } from "$lib/server/pages";
import { page } from "$app/state";

export const ssr = false;

export const load: PageServerLoad = async ({ params, locals }) => {
  if (locals.user === null) {
    return redirect(302, "/login");
  }

  const _notebook_name = await get_notebook_name(
    locals.user.id,
    params.notebook
  );
  const _section_name = await get_section_name(params.notebook, params.section);

  const section_pages = await notebook_section_pages(
    params.notebook,
    params.section
  );

  return {
    notebook_id: params.notebook,
    section_id: params.section,
    notebook_name: _notebook_name,
    section_name: _section_name,
    pages: section_pages,
  };
};

export const actions = {
  default: async ({ params, locals, request }) => {
    if (locals.user === null) {
      return redirect(302, "/login");
    }

    const form_data = await request.formData();
    const page_name = form_data.get("page-name");

    if (typeof page_name !== "string") {
      return fail(400, {
        message: "Invalid or missing field",
      });
    }

    if (page_name.length === 0) {
      return fail(400, {
        message: "Page must have a name",
      });
    }

    await create_page(page_name, params.section);

    return redirect(
      302,
      `/notebooks/${params.notebook}/sections/${params.section}/selected-section`
    );
  },
};
