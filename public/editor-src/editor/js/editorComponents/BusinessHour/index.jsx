import React from "react";
import { noop } from "underscore";
import EditorComponent from "visual/editorComponents/EditorComponent";
import classnames from "classnames";
import CustomCSS from "visual/component/CustomCSS";
import BoxResizer from "visual/component/BoxResizer";
import { TextEditor } from "visual/component/Controls/TextEditor";
import * as sidebarExtend from "./sidebarExtend";
import * as toolbarExtend from "./toolbarExtend";
import * as sidebarExtendTitle from "./sidebarExtendTitle";
import * as toolbarExtendTitle from "./toolbarExtendTitle";
import * as toolbarExtendParentConfig from "./toolbarExtendParent";
import * as sidebarExtendParentConfig from "./sidebarExtendParent";
import Items from "./Items";
import { styleContent } from "./styles";
import { css } from "visual/utils/cssStyle";
import defaultValue from "./defaultValue.json";
import Toolbar from "visual/component/Toolbar";
import { Wrapper } from "../tools/Wrapper";

const resizerPoints = ["centerLeft", "centerRight"];

class BusinessHour extends EditorComponent {
  static get componentId() {
    return "BusinessHour";
  }

  static defaultProps = {
    meta: {},
    extendParentToolbar: noop
  };

  static defaultValue = defaultValue;

  componentDidMount() {
    const toolbarExtend = this.makeToolbarPropsFromConfig2(
      toolbarExtendParentConfig,
      sidebarExtendParentConfig,
      {
        allowExtend: false,
        allowExtendFromThirdParty: true,
        thirdPartyExtendId: `${this.constructor.componentId}Parent`
      }
    );
    this.props.extendParentToolbar(toolbarExtend);
  }

  handleTextChange = title => {
    this.patchValue({ title });
  };

  handleResizerChange = patch => this.patchValue(patch);

  renderForEdit(v, vs, vd) {
    const { title } = v;
    const classNameContent = classnames(
      "brz-business-hour",
      css(
        `${this.constructor.componentId}`,
        `${this.getId()}`,
        styleContent(v, vs, vd)
      )
    );
    const itemProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      toolbarExtend: this.makeToolbarPropsFromConfig2(
        toolbarExtend,
        sidebarExtend,
        {
          allowExtend: false
        }
      ),
      meta: this.props.meta
    });

    const resizerRestrictions = {
      width: {
        px: {
          min: 100,
          max: 1000
        },
        "%": {
          min: 20,
          max: 100
        }
      },
      tabletWidth: {
        px: {
          min: 50,
          max: 1000
        },
        "%": {
          min: 20,
          max: 100
        }
      },
      mobileWidth: {
        px: {
          min: 50,
          max: 1000
        },
        "%": {
          min: 20,
          max: 100
        }
      }
    };

    return (
      <CustomCSS selectorName={this.getId()} css={v.customCSS}>
        <Wrapper {...this.makeWrapperProps({ className: classNameContent })}>
          <BoxResizer
            points={resizerPoints}
            meta={this.props.meta}
            value={v}
            onChange={this.handleResizerChange}
            restrictions={resizerRestrictions}
          >
            <div className="brz-business-hour-wrapper">
              <ul>
                <Toolbar
                  {...this.makeToolbarPropsFromConfig2(
                    toolbarExtendTitle,
                    sidebarExtendTitle
                  )}
                >
                  <li className="brz-business-hour-title">
                    <TextEditor
                      value={title}
                      onChange={this.handleTextChange}
                    />
                  </li>
                </Toolbar>
                <Items {...itemProps} />
              </ul>
            </div>
          </BoxResizer>
        </Wrapper>
      </CustomCSS>
    );
  }
}

export default BusinessHour;
