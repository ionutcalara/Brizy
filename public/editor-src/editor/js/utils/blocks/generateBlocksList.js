import { getAllowedGBIds } from "./getAllowedGBIds";

import { IS_GLOBAL_POPUP } from "visual/utils/models";

const generateConditionBlocks = (ids, globalBlocks, type) => {
  return ids
    .filter(
      id =>
        globalBlocks[id] &&
        globalBlocks[id].position &&
        globalBlocks[id].position.align === type
    )
    .sort(
      (id, nextId) =>
        globalBlocks[id].position[type] - globalBlocks[nextId].position[type]
    );
};

export const generateBlocksList = (pageBlocksIds, globalBlocks) => {
  if (IS_GLOBAL_POPUP) {
    return pageBlocksIds;
  }

  const allowedGBIds = getAllowedGBIds(pageBlocksIds, globalBlocks);

  const topAlignedConditionBlocks = generateConditionBlocks(
    allowedGBIds,
    globalBlocks,
    "top"
  );
  const bottomAlignedConditionBlocks = generateConditionBlocks(
    allowedGBIds,
    globalBlocks,
    "bottom"
  );

  const blocks = [
    ...topAlignedConditionBlocks,
    ...pageBlocksIds,
    ...bottomAlignedConditionBlocks
  ];

  return blocks;
};
