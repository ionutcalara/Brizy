import React from "react";
import _ from "underscore";
import classNames from "classnames";
import Prompts from "visual/component/Prompts";
import { t } from "visual/utils/i18n";
import { getStore } from "visual/redux/store";
import { updateGBRules } from "visual/redux/actions2";
import { GlobalBlock } from "visual/types";

import { globalBlocksSelector } from "visual/redux/selectors";

interface Props {
  value: string;
  className?: string;
  attr?: React.HTMLAttributes<HTMLDivElement>;
}

const GbConditionsOptionType: React.FC<Props> = ({
  className: _className = "",
  value,
  attr: _attr = {}
}) => {
  const className = classNames(
    "brz-ed-option__popup_conditions",
    _className,
    _attr.className
  );
  const attr = _.omit(_attr, "className");

  const state = getStore().getState();
  const globalBlocks = globalBlocksSelector(state);
  const { rules } = globalBlocks[value];

  const handleMouseDown = (): void => {
    type ChangeData = {
      data: {
        rules: GlobalBlock["rules"];
      };
      meta: {
        syncSuccess: (s?: void) => void;
        syncFail: (e?: void) => void;
      };
    };
    Prompts.open({
      prompt: "conditions",
      mode: "single",
      props: {
        options: [
          {
            id: "rules",
            type: "rules",
            icon: "nc-eye-17",
            label: t("Conditions"),
            title: t("WHERE DO YOU WANT TO DISPLAY IT?"),
            value: rules,
            onChange: ({ data: { rules }, meta }: ChangeData): void => {
              getStore().dispatch(
                updateGBRules({
                  data: {
                    rules,
                    id: value
                  },
                  meta
                })
              );
            }
          }
        ]
      }
    });
  };

  return (
    <div className={className} onMouseDown={handleMouseDown} {...attr}>
      <span className="brz-ed-option__popup_conditions-count">
        {rules.length}
      </span>
      {t(" Display Conditions")}
    </div>
  );
};

export default GbConditionsOptionType;
