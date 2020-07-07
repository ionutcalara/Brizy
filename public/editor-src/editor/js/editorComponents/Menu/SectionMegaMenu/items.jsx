import React from "react";
import EditorArrayComponent from "visual/editorComponents/EditorArrayComponent";
import Sortable from "visual/component/Sortable";
import { hideToolbar } from "visual/component/Toolbar";
import { t } from "visual/utils/i18n";

class SectionMegaMenuItems extends EditorArrayComponent {
  static get componentId() {
    return "SectionMegaMenu.Items";
  }

  static defaultProps = {
    className: "",
    meta: {}
  };

  getItemProps(itemData, itemIndex) {
    const cloneRemoveConfig = {
      getItems: () => [
        {
          id: "duplicate",
          type: "button",
          devices: "desktop",
          icon: "nc-duplicate",
          title: t("Duplicate"),
          position: 200,
          onChange: () => {
            this.cloneItem(itemIndex);
          }
        },
        {
          id: "remove",
          type: "button",
          devices: "desktop",
          icon: "nc-trash",
          title: t("Delete"),
          position: 250,
          onChange: () => {
            hideToolbar();
            this.removeItem(itemIndex);
          }
        }
      ]
    };

    return {
      meta: this.props.meta,
      toolbarExtend: this.makeToolbarPropsFromConfig2(cloneRemoveConfig)
    };
  }

  renderItemsContainer(items) {
    if (IS_PREVIEW) {
      return <div className={this.props.className}>{items}</div>;
    }

    const sortableContent = items.length ? (
      <div className={this.props.className}>{items}</div>
    ) : null;

    return (
      <Sortable
        path={this.getPath()}
        type="section"
        acceptElements={["row", "column", "shortcode", "addable"]}
      >
        {sortableContent}
      </Sortable>
    );
  }
}

export default SectionMegaMenuItems;
