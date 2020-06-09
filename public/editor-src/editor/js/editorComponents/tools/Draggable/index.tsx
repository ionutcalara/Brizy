import React, { FC, useCallback, useState } from "react";
import { WithOnChange } from "visual/utils/options/attributes";
import { Value } from "./entities/Value";
import { HAlign } from "visual/utils/position/HAlign";
import { VAlign } from "visual/utils/position/VAlign";
import Drag from "visual/component/Draggable";

type Delta = { deltaX: number; deltaY: number };
type Props = WithOnChange<Value> & {
  hAlign: HAlign;
  vAlign: VAlign;
  xUint: string;
  yUint: string;
  x: number;
  y: number;
};

export const Draggable: FC<Props> = ({
  children,
  onChange,
  hAlign,
  vAlign,
  x,
  y
}) => {
  const [v, setValue] = useState<Value>({ x, y });

  const onDrag = useCallback(
    ({ deltaX, deltaY }: Delta) => {
      onChange({
        x: v.x + deltaX,
        y: v.y + deltaY
      });
    },
    [hAlign, vAlign, v.x, v.y]
  );
  const onDragStart = useCallback(() => {
    if (v.x !== x || v.y !== y) {
      setValue({ x, y });
    }
  }, [x, y]);

  return (
    <Drag
      exceptions={[
        ".brz-ed-toolbar",
        ".brz-ed-tooltip__content-portal",
        ".brz-rich-text .brz-ed-content-editable-focus"
      ]}
      onDrag={onDrag}
      onDragStart={onDragStart}
    >
      {children}
    </Drag>
  );
};
