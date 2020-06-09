import React from "react";
import EditorComponent from "visual/editorComponents/EditorComponent";
import { TextEditor } from "visual/component/Controls/TextEditor";
import classnames from "classnames";
import CustomCSS from "visual/component/CustomCSS";
import Toolbar from "visual/component/Toolbar";
import * as sidebar from "./sidebar";
import toolbarConfigFn from "./toolbar.js";
import { style } from "./styles";
import { css } from "visual/utils/cssStyle";
import defaultValue from "./defaultValue.json";

class BusinessHourItem extends EditorComponent {
  static get componentId() {
    return "BusinessHourItem";
  }

  static defaultValue = defaultValue;

  handleDayChange = day => {
    this.patchValue({ day });
  };

  handleTimeChange = time => {
    this.patchValue({ time });
  };

  renderForEdit(v, vs, vd) {
    const { customCSS, day, time } = v;
    const { isLast } = this.props;
    const classNameContent = classnames(
      "brz-business-hour-item",
      css(
        `${this.constructor.componentId}`,
        `${this.getId()}`,
        style(v, vs, vd)
      )
    );
    const toolbarExtend = toolbarConfigFn(isLast);

    return (
      <Toolbar {...this.makeToolbarPropsFromConfig2(toolbarExtend, sidebar)}>
        <CustomCSS selectorName={this.getId()} css={customCSS}>
          <li className={classNameContent}>
            <span className="brz-business-hour-day">
              <TextEditor value={day} onChange={this.handleDayChange} />
            </span>
            <span className="brz-business-hour-time">
              <TextEditor value={time} onChange={this.handleTimeChange} />
            </span>
          </li>
        </CustomCSS>
      </Toolbar>
    );
  }
}

export default BusinessHourItem;
