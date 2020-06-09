import produce from "immer";
import { IS_GLOBAL_POPUP } from "visual/utils/models";
import { Block } from "visual/types";
import {
  pageAssembledRawSelector,
  pageAssembledSelector
} from "visual/redux/selectors";
import { ReduxState } from "../types";
import { ReduxAction } from "../actions2";

type Page = ReduxState["page"];
type RPage = (s: Page, a: ReduxAction, f: ReduxState) => Page;

export const page: RPage = (state, action, fullState) => {
  switch (action.type) {
    case "HYDRATE": {
      const { page } = action.payload;
      const items = page.data?.items || [];

      return produce<Page>(page, draft => {
        draft.data.items = items.map((block: Block) => block.value._id);
      });
    }
    case "PUBLISH": {
      const { status } = action.payload;

      const currentState = IS_GLOBAL_POPUP
        ? pageAssembledSelector(fullState)
        : pageAssembledRawSelector(fullState);

      return produce<Page>(currentState, draft => {
        draft.status = status;
        draft.dataVersion = draft.dataVersion + 1;
      });
    }
    case "UPDATE_TRIGGERS": {
      const { data: triggers } = action.payload;

      return produce<Page>(state, draft => {
        draft.data.triggers = triggers;
        draft.dataVersion = draft.dataVersion + 1;
      });
    }
    case "UPDATE_POPUP_RULES": {
      return produce<Page>(state, draft => {
        draft.data.rulesAmount = action.payload.length;
        draft.dataVersion = draft.dataVersion + 1;
      });
    }
    default:
      return state;
  }
};
