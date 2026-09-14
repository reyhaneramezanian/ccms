import { User_GetSecuritiesQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import utils from '@/utils/utils';

class SecurityTransformer extends Transformer<User_GetSecuritiesQuery> {
    transforms(transfers: User_GetSecuritiesQuery) {
        return transfers.user_getSecurities.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            securityId: transfer.securityId,
            Name: transfer.firstName + ' ' + transfer.lastName,
            Phone: transfer.phoneNumber,
            Email: transfer.email,
            activeStatus: transfer.activeStatus,
            activeStatuses: utils.convertoLowerCase(transfer.activeStatus),
            Firstname: transfer.firstName,
            Lastname: transfer.lastName,
            Yearsofexperience: transfer.yearsOfExperience,
            gender: transfer.gender,
            gendertext: utils.convertoLowerCase(transfer.gender),
            dateOfBirth: transfer.dateOfBirth.slice(0, 10),
            dateOfBirths: transfer.dateOfBirth.slice(0, 10).replaceAll('-', '/'),
            complexId: transfer.complexId,
            Complex: transfer.complex.name,
            employeeType: transfer.employmentType.name,
            employmentTypeId: transfer.employmentTypeId,
            photoUrl: transfer.photoUrl,
            middleName: transfer.middleName,
            dateOfJoining: transfer.dateOfJoining?.slice(0, 10),
            dateOfTermination: transfer.dateOfTermination?.slice(0, 10)
        }));
    }
}

export default new SecurityTransformer();
