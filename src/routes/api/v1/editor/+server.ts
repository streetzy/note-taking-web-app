import { Page } from "$lib/models/models";
import type { OutputData } from "@editorjs/editorjs";
import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({params, locals, request}) => {
    const data: { page_id: string, saved_data: OutputData} = await request.json();

    await Page.findByIdAndUpdate(data.page_id, { editorjs_content: data.saved_data}).exec();

    return new Response();
}