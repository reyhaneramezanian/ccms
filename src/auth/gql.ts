import { CommonResponse } from 'src/@types/graphql.type';
import { UserType, LoginType, UserTypes } from 'src/@types/user.type';
import * as gql from 'gql-query-builder';
import { graphqlFetcher } from '@/utils/http/graphql.fetcher';

export const LOG_IN_USER_KEY = 'user_getCurrentUser';
export const user_login = gql.query(
    [
        {
            operation: LOG_IN_USER_KEY,
            fields: [
                'status',
                {
                    result: [
                        'id',
                        'userType',
                        'firstName',
                        'lastName',
                        'gender',
                        'gender',
                        'dateOfBirth',
                        'phoneNumber',
                        'activeStatus',
                        'approvalStatus',
                        'email',
                        'photoUrl'
                    ]
                }
            ]
        }
    ],
    null,
    {
        operationName: LOG_IN_USER_KEY
    }
);
export type user_signInType = {
    args: undefined;
    res: CommonResponse<typeof LOG_IN_USER_KEY, UserType>;
};

export const user_signInFetcher = () => {
    return graphqlFetcher<user_signInType>(user_login.query);
};

export const SIGN_UP_USER_KEY = 'user_signUp';
export const user_signUp = gql.mutation({
    operation: SIGN_UP_USER_KEY,
    variables: {
        LoginType: {
            type: 'LoginType',
            required: true
        },
        UserTypes: {
            type: 'UserTypes',
            required: true
        }
    },
    fields: [
        'status',
        {
            variables: undefined,
            operation: 'result',
            fields: ['email', 'name', 'id', 'userTypes']
        }
    ]
});

export type user_signUpType = {
    args: { LoginType: LoginType; UserTypes: UserTypes };
    res: CommonResponse<typeof SIGN_UP_USER_KEY, UserType>;
};

export const user_signUpFetcher = (args) => {
    return graphqlFetcher<user_signUpType>(user_signUp.query, args);
};
