import { ResStatusType } from "src/@types/graphql.type";

export const RES_STATUS: Record<string, ResStatusType> = {
  success: "SUCCESS",
  deplicate: "ALREADY_EXISTS",
  error: "ERROR",
  unauthorize: "AUTHENTICATION_FAILED",
};

export const DEFAULT_PAGE_SIZE_REQ = {
  request: {
    pageSize: 20,
    skip: 0,
  },
};
