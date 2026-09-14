import { ActiveStatus, ApprovalStatus, UserType as userType } from 'src/graphql/generated';
import { ResStatusType } from './graphql.type';
import { GenderType, CollectionSegmentInfo } from './util.type';

export type ProviderNameType =
    | 'USER'
    | 'DOCTOR'
    | 'CLINIC'
    | 'HOSPITAL'
    | 'LAB'
    | 'PHARMACY'
    | 'DENTIST'
    | 'MEDICAL_BEAUTY_CENTER'
    | 'VETERINARIAN'
    | 'NUTRITION_EXPERT'
    | 'HOME_SERVICE'
    | 'AMBULANCE';

// TODO change
export type UserType = {
    userType: userType;
    firstName?: string;
    lastName?: string;
    gender: GenderType;
    dateOfBirth: Date;
    phoneNumber?: string;
    activeStatus?: ActiveStatus;
    approvalStatus?: ApprovalStatus;
    email: string;
    photoUrl?: string;
};

export type LoginType = 'GOOGLE' | 'FACE_BOOK';

export type UserTypes = 'ADMIN' | 'CLIENT' | 'HEALER';

export type ResponseBaseOfUser = {
    result: UserType;
    status: ResStatusType;
};
export type UserCollectionSegment = {
    items: Array<UserType>;
    pageInfo: CollectionSegmentInfo;
    totalCount: number;
};
