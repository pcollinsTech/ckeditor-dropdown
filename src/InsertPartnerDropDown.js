import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";

import partnerItems from "./partnerItems";
export default class InsertPartnerDropDown extends Plugin {
  init() {
    const editor = this.editor;

    // Register a component which could be added to the toolbar.
    editor.ui.componentFactory.add("insertPartnerDropdownItem", (locale) => {
      // Create a new collection and add items to it.
      const dropdownItems = new Collection();

      partnerItems.map((item) => {
        return dropdownItems.add({
          type: "button",
          model: {
            withText: true,
            label: item.label,
            content: item.content,
          },
        });
      });

      // Create a dropdown and add dropdownItems from the collection to it.
      const dropdown = createDropdown(locale);
      addListToDropdown(dropdown, dropdownItems);

      // Insert dropdown item's value to the editor at current position.
      dropdown.on("execute", (evt) => {
        editor.model.change((writer) => {
          editor.model.insertContent(writer.createText(evt.source.content));
        });
      });

      dropdown.buttonView.set({
        label: "Partner",
        withText: true,
      });

      return dropdown;
    });
  }
}
