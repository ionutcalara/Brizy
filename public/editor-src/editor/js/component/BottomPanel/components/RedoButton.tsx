import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import EditorIcon from "visual/component/EditorIcon";
import { redo } from "visual/redux/actions2";
import { ReduxStateWithHistory } from "visual/redux/types";

export const RedoButton: React.FC = () => {
  const canRedo = useSelector<ReduxStateWithHistory>(
    state => state.history.canRedo
  );
  const dispatch = useDispatch();
  const className = classnames("brz-li brz-ed-fixed-bottom-panel__item", {
    active: canRedo
  });

  return (
    <li
      className={className}
      title="Redo (CTRL+SHIFT+Z)"
      onClick={(): void => {
        dispatch(redo());
      }}
    >
      <EditorIcon icon="nc-redo" />
    </li>
  );
};
