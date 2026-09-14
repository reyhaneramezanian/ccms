// import { ResStatusType } from 'src/@types/graphql.type';

export const RES_STATUS = {
    success: 'Success',
    deplicate: 'AlreadyExist',
    error: 'Error',
    unauthorize: 'AuthenticationFailed'
};

export const DEFAULT_PAGE_SIZE_REQ = {
    request: {
        pageSize: 1000,
        skip: 0
    }
};
