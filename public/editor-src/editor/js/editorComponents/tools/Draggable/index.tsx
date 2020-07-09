import React, { FC, ReactNode, Ref, useCallback, useState } from "react";
import { WithOnChange } from "visual/utils/options/attributes";
import { Value } from "./entities/Value";
import { HAlign } from "visual/utils/position/HAlign";
import { VAlign } from "visual/utils/position/VAlign";
import { Draggable as Drag } from "visual/component/Draggable";
import { getCurrentW, getCurrentH } from "visual/utils/meta";

type Delta = { deltaX: number; deltaY: number };
type Props = WithOnChange<Value> & {
  active?: boolean;
  hAlign: HAlign;
  vAlign: VAlign;
  xSuffix: string;
  ySuffix: string;
  x: number;
  y: number;
  onStart?: (value: Value) => void;
  onEnd?: (value: Value) => void;
  children: (ref: Ref<HTMLElement>, className?: string) => ReactNode;
};

export const Draggable: FC<Props> = ({
  active,
  children,
  onChange,
  onStart,
  onEnd,
  hAlign,
  vAlign,
  xSuffix,
  ySuffix,
  x,
  y
}) => {
  const [v, setValue] = useState<Value>({ x, y });

  const onDrag = useCallback(
    ({ deltaX, deltaY }: Delta) => {
      const offsetX =
        xSuffix === "px" ? deltaX : (deltaX * 100) / getCurrentW();
      const offsetY =
        ySuffix === "px" ? deltaY : (deltaY * 100) / getCurrentH();

      onChange({
        x: Math.round(v.x + offsetX),
        y: Math.round(v.y + offsetY)
      });
    },
    [hAlign, vAlign, v.x, v.y]
  );
  const onDragStart = useCallback(() => {
    if (v.x !== x || v.y !== y) {
      onStart && onStart({ x, y });
      setValue({ x, y });
    }
  }, [x, y]);

  const onDragEnd = useCallback(() => {
    if (v.x !== x || v.y !== y) {
      onEnd && onEnd({ x, y });
    }
  }, [x, y]);

  return (
    <Drag
      active={active}
      exceptions={[
        ".brz-ed-toolbar",
        ".brz-ed-tooltip__content-portal",
        ".brz-rich-text .brz-ed-content-editable-focus"
      ]}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      {children}
    </Drag>
  );
};
