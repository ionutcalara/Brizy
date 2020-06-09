import _ from "underscore";
import Config from "visual/global/Config";
import {
  getCurrentRule,
  TEMPLATES_GROUP_ID,
  TEMPLATE_TYPE
} from "./blocksConditions";
import { IS_WP, IS_TEMPLATE } from "visual/utils/models";

export const getAllowedGBIds = (pageBlocks, globalBlocks) => {
  return IS_WP
    ? Object.entries(globalBlocks).reduce(
        (acc, [currentGlobalBlockId, { rules }]) => {
          const isInPage = pageBlocks.includes(currentGlobalBlockId);
          const canUseCondition = IS_TEMPLATE
            ? canUseConditionInTemplates(rules)
            : canUseConditionInPage(rules);

          if (!isInPage && canUseCondition) {
            acc.push(currentGlobalBlockId);
          }

          return acc;
        },
        []
      )
    : Object.keys(globalBlocks);
};

export function canUseConditionInTemplates(rules) {
  const { ruleMatches, page } = Config.get("wp");

  const templateCondition = rules.find(
    ({ entityType, appliedFor, entityValues }) =>
      appliedFor === TEMPLATES_GROUP_ID &&
      entityType === TEMPLATE_TYPE &&
      entityValues.includes(page)
  );

  if (templateCondition) {
    return isIncludeCondition(templateCondition);
  }

  const templateRules = ruleMatches.map(
    ({ type, group, entityType, values }) => ({
      type,
      entityType,
      appliedFor: group,
      entityValues: values
    })
  );

  const blockGroupedRules = templateSplitRules(rules);
  const templateGroupedRules = templateSplitRules(templateRules);

  let condition = blockGroupedRules.level1.find(rule =>
    templateGroupedRules.level1.find(
      ({ entityType, appliedFor, entityValues }) =>
        appliedFor === rule.appliedFor &&
        entityType === rule.entityType &&
        _.intersection(entityValues, rule.entityValues).length
    )
  );

  if (condition) {
    return isIncludeCondition(condition);
  }

  condition = blockGroupedRules.level2.find(rule =>
    templateGroupedRules.level2.find(
      ({ entityType, appliedFor }) =>
        appliedFor === rule.appliedFor && entityType === rule.entityType
    )
  );

  if (condition) {
    return isIncludeCondition(condition);
  }

  // condition = blockGroupedRules.level3.find(rule =>
  //   templateGroupedRules.level3.find(
  //     ({ appliedFor }) => appliedFor === rule.appliedFor
  //   )
  // );

  if (blockGroupedRules.level3.length) {
    return isIncludeCondition(blockGroupedRules.level3[0]);
  }

  return false;
}

export function templateSplitRules(rules) {
  return rules.reduce(
    (acc, item) => {
      const { appliedFor, entityType, entityValues } = item;
      if (entityType === TEMPLATE_TYPE) return acc;

      if (appliedFor === "") {
        acc.level3.push(item);
      } else if (entityValues.length) {
        acc.level1.push(item);
      } else {
        acc.level2.push(item);
      }

      return acc;
    },
    {
      level1: [],
      level2: [],
      level3: []
    }
  );
}

export function pageSplitRules(rules = []) {
  const { page } = Config.get("wp");
  const currentRule = getCurrentRule();

  const level1 = rules.find(
    ({ appliedFor, entityType, entityValues }) =>
      appliedFor === currentRule.group &&
      entityType === currentRule.type &&
      entityValues.includes(page)
  );

  const level2 = rules.find(
    ({ appliedFor, entityType, entityValues }) =>
      appliedFor === currentRule.group &&
      entityType === currentRule.type &&
      !entityValues.length
  );

  const level3 = rules.find(
    ({ appliedFor, entityType }) => appliedFor === "" && entityType === ""
  );

  return {
    level1,
    level2,
    level3
  };
}

export function canUseConditionInPage(rules) {
  const { level1, level2, level3 } = pageSplitRules(rules);

  if (level1) {
    return isIncludeCondition(level1);
  }

  if (level2) {
    return isIncludeCondition(level2);
  }

  if (level3) {
    return isIncludeCondition(level3);
  }

  return false;
}

function isIncludeCondition(condition) {
  return condition.type === 1;
}
