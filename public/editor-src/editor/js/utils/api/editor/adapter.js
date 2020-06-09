import {
  ProjectError,
  PageError,
  GlobalBlocksError
} from "visual/utils/errors";

// project

export const parseProject = project => {
  let data;

  if (!project.data) {
    throw new ProjectError("Project data should exist");
  } else {
    try {
      data = JSON.parse(project.data);
    } catch (e) {
      throw new ProjectError(`Failed to parse project data ${project.data}`);
    }
  }

  return { ...project, data };
};

export const stringifyProject = project => {
  let data = JSON.stringify(project.data);

  return { ...project, data };
};

// page

export const parsePage = page => {
  const id = String(page.id);
  let data;

  if (!page.data) {
    data = {};
  } else {
    try {
      data = JSON.parse(page.data);
    } catch (e) {
      throw new PageError(`Failed to parse page ${page.data}`);
    }
  }

  return { ...page, id, data };
};

export const stringifyPage = page => {
  let data = JSON.stringify(page.data);

  return { ...page, data };
};

// global blocks

export const parseGlobalBlock = globalBlock => {
  let data;
  let meta;

  if (!globalBlock.data) {
    throw new GlobalBlocksError("globalBlock data should exist");
  } else {
    try {
      data = JSON.parse(globalBlock.data);
    } catch (e) {
      throw new GlobalBlocksError(
        `Failed to parse globalBlock data ${globalBlock.data}`
      );
    }
  }

  if (!globalBlock.meta) {
    meta = {};
  } else {
    try {
      meta = JSON.parse(globalBlock.meta);
    } catch (e) {
      meta = {};
    }
  }

  return { ...globalBlock, data, meta };
};

export const stringifyGlobalBlock = globalBlock => {
  const data = JSON.stringify(globalBlock.data);
  const meta = JSON.stringify(globalBlock.meta);
  const rules = JSON.stringify(globalBlock.rules);

  return { ...globalBlock, data, meta, rules };
};
