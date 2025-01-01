import { Section, Page } from "$lib/models/models";

export async function update_page_name(
  section_id: string,
  page_id: string,
  _name: string
) {
  const page = await Page.findById(page_id).exec();

  if (page.parent_section.toString() !== section_id) {
    return null;
  }

  await page.findByIdAndUpdate(page_id, { name: _name }).exec();
}

export async function remove_page(section_id: string, page_id: string) {
  const page = await Page.findById(page_id).exec();

  if (page.parent_section.toString() !== section_id) {
    return null;
  }

  await Page.findByIdAndDelete(page_id).exec();
}

export async function get_page_name(section_id: string, page_id: string) {
  const page = await Page.findById(page_id).exec();

  if (page.parent_section.toString() !== section_id) {
    return null;
  }

  return page.name;
}

export async function create_page(name: string, section_id: string) {
  const section = await Section.findById(section_id).exec();

  if (!section) {
    return null;
  }
  const page_data = new Page({
    name: name,
    parent_section: section_id,
  });

  await page_data.save();

  section.pages.push(page_data._id);
  await section.save();
}

export async function notebook_section_pages(
  notebook_id: string,
  section_id: string
) {
  const section = await Section.findById(section_id).populate("pages").exec();

  if (section.parent_notebook.toString() !== notebook_id) {
    return null;
  }

  const sections_pages = section.pages;

  const pages_info: {
    page_id: string;
    page_name: string;
    editorjs_content: {
      time: number;
      blocks: { type: String; data: Object }[];
      version: String;
    };
  }[] = sections_pages.map(
    (page: {
      _id: string;
      name: string;
      editorjs_content: {
        time: number;
        blocks: { type: String; data: Object }[];
        version: String;
      };
    }) => {
      console.log(page);
      const content = JSON.parse(JSON.stringify(page.editorjs_content));
      delete content["_id"];
      return {
        page_id: page._id.toString(),
        page_name: page.name,
        editorjs_content: content,
      };
    }
  );

  return pages_info;
}
