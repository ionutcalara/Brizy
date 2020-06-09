import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import EditorIcon from "visual/component/EditorIcon";
import { undo } from "visual/redux/actions2";
import { ReduxStateWithHistory } from "visual/redux/types";

export const UndoButton: React.FC = () => {
  const canUndo = useSelector<ReduxStateWithHistory>(
    state => state.history.canUndo
  );
  const dispatch = useDispatch();
  const className = classnames("brz-li brz-ed-fixed-bottom-panel__item", {
    active: canUndo
  });

  return (
    <li
      className={className}
      title="Undo (CTRL+Z)"
      onClick={(): void => {
        dispatch(undo());
      }}
    >
      <EditorIcon icon="nc-undo" />
    </li>
  );
};
