import React from "react";
import _ from "underscore";
import classNames from "classnames";
import Prompts from "visual/component/Prompts";
import { t } from "visual/utils/i18n";
import { getStore } from "visual/redux/store";
import { getRulesList } from "visual/utils/api/editor";
import { IS_EXTERNAL_POPUP } from "visual/utils/models";

import { rulesAmountSelector, triggersSelector } from "visual/redux/selectors";
import { updatePopupRules } from "visual/redux/actions";

class PopupConditionsOptionType extends React.Component {
  static defaultProps = {
    className: "",
    attr: {}
  };

  calConditionsAmount() {
    const state = getStore().getState();
    let rulesAmount = 0;
    if (!IS_EXTERNAL_POPUP) {
      rulesAmount = rulesAmountSelector(state);
      // for cases when rule was created by WP
      rulesAmount = rulesAmount === null ? 1 : rulesAmount;
    }

    const triggers = triggersSelector(state);
    const triggerOnceExist = triggers.find(({ id }) => id === "triggerOnce");
    const triggersLength = triggerOnceExist
      ? triggers.length
      : triggers.length + 1;

    return rulesAmount + triggersLength;
  }

  handleChangeRules = data => {
    getStore().dispatch(updatePopupRules(data));
  };

  handleMouseDown = () => {
    let options = [
      {
        id: "triggers",
        type: "triggers",
        icon: "nc-triggers",
        label: t("Triggers"),
        title: t("WHAT WILL TRIGGER THE POPUP TO OPEN")
      }
    ];

    if (!IS_EXTERNAL_POPUP) {
      options.push({
        id: "rules",
        type: "rules",
        icon: "nc-eye-17",
        label: t("Conditions"),
        title: t("WHERE DO YOU WANT TO DISPLAY IT?"),
        asyncGetValue: getRulesList,
        onChange: this.handleChangeRules
      });
    }

    Prompts.open({
      prompt: "conditions",
      mode: "single",
      props: { options }
    });
  };

  render() {
    const { className: _className, attr: _attr } = this.props;

    const className = classNames(
      "brz-ed-option__popup_conditions",
      _className,
      _attr.className
    );
    const attr = _.omit(_attr, "className");

    return (
      <div className={className} onMouseDown={this.handleMouseDown} {...attr}>
        <span className="brz-ed-option__popup_conditions-count">
          {this.calConditionsAmount()}
        </span>
        {t(" Display Conditions")}
      </div>
    );
  }
}

export default PopupConditionsOptionType;
