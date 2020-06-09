import produce from "immer";
import { mapModels } from "visual/utils/models";
import { objectTraverse2 } from "visual/utils/object";

import { blocksOrderSelector, globalBlocksSelector } from "../selectors";

import { ReduxState } from "../types";
import { ReduxAction } from "../actions2";

type BlocksData = ReduxState["blocksData"];
type RBlocksData = (s: BlocksData, a: ReduxAction, f: ReduxState) => BlocksData;

export const blocksData: RBlocksData = (state = {}, action, allState) => {
  switch (action.type) {
    case "HYDRATE": {
      const { page, globalBlocks } = action.payload;
      const items = page.data?.items || [];

      // it's needed for legacy popups
      const pageBlocksData = items.reduce((acc, block) => {
        // globalBlockId - it's needed for legacy models
        const { _id, globalBlockId } = block.value;
        const id = globalBlockId || _id;
        acc[id] = block;

        return acc;
      }, {} as BlocksData);

      const globalBlocksData = Object.entries(globalBlocks).reduce(
        (acc, [id, item]) => {
          acc[id] = item.data;

          return acc;
        },
        {} as BlocksData
      );

      return produce<BlocksData>(
        { ...pageBlocksData, ...globalBlocksData },
        draft => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          objectTraverse2(draft, (obj: any) => {
            if (obj.type && obj.type === "GlobalBlock") {
              const { globalBlockId } = obj.value;

              if (globalBlockId) {
                obj.value._id = globalBlockId;

                delete obj.value.globalBlockId;
              }
            }
          });
        }
      );
    }

    case "ADD_BLOCK": {
      const { block } = action.payload;

      return {
        ...state,
        [block.value._id]: block
      };
    }

    case "MAKE_GLOBAL_BLOCK_TO_POPUP":
    case "MAKE_GLOBAL_TO_NORMAL_BLOCK": {
      const { block } = action.payload;

      return {
        ...state,
        [block.value._id]: block
      };
    }

    case "MAKE_POPUP_TO_GLOBAL_BLOCK": {
      const { data } = action.payload;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newState = mapModels((block: any) => {
        if (block.value._id === data.value._id) {
          return {
            blockId: block.blockId,
            type: "GlobalBlock",
            value: {
              _id: data.value._id
            }
          };
        }

        return block;
      }, state);

      return produce<BlocksData>(newState, draft => {
        draft[data.value._id] = data;
      });
    }

    case "REMOVE_BLOCK": {
      const { index } = action.payload;
      const globalBlocks = globalBlocksSelector(allState);
      const globalBlocksIds = Object.keys(globalBlocks);

      const blocksIds = blocksOrderSelector(allState);
      const id = blocksIds[index];

      if (!globalBlocksIds.includes(id)) {
        return produce(state, draft => {
          delete draft[id];
        });
      }

      return state;
    }

    case "REMOVE_BLOCKS": {
      const blocksIds: string[] = blocksOrderSelector(allState);

      const globalBlocks = globalBlocksSelector(allState);
      const globalBlocksIds = Object.keys(globalBlocks);

      const pageBlocksIds = blocksIds.filter(
        id => !globalBlocksIds.includes(id)
      );

      return produce(state, draft => {
        pageBlocksIds.forEach(id => {
          delete draft[id];
        });
      });
    }

    // if block is a slider & globalBlock and we remove
    // last slide - then instead of REMOVE_BLOCK action we get
    // UPDATE_GLOBAL_BLOCK - with payload.data.value = null
    case "UPDATE_GLOBAL_BLOCK": {
      const { id, data } = action.payload;

      if (data.value === null) {
        return state;
      }

      return { ...state, [id]: data };
    }

    case "IMPORT_TEMPLATE":
    case "UPDATE_BLOCKS": {
      const { blocks } = action.payload;

      const newBlocks = blocks.reduce((acc, item) => {
        if (item.type === "GlobalBlock") {
          return acc;
        }

        const id: string = item.value._id;
        acc[id] = item;

        return acc;
      }, {} as BlocksData);

      return {
        ...state,
        ...newBlocks
      };
    }

    default:
      return state;
  }
};
