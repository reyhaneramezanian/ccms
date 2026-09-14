import { ResidentFlat_GetResidentFlatsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import utils from '@/utils/utils';

class PropertyTransformer extends Transformer<ResidentFlat_GetResidentFlatsQuery> {
    transforms(transfers: ResidentFlat_GetResidentFlatsQuery) {
        return transfers.residentFlat_getResidentFlats.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Name: transfer.resident.firstName + ' ' + transfer.resident.lastName,
            Phone: transfer.resident.phoneNumber,
            Email: transfer.resident.email,
            Approval: [
                transfer.id,
                'propertyapproval',
                transfer.resident.firstName + ' ' + transfer.resident.lastName
            ],
            firstName: transfer.resident.firstName,
            lastName: transfer.resident.lastName,
            gendertext: utils.convertoLowerCase(transfer.resident.gender),
            gender: transfer.resident.gender,
            primaryContact: transfer.resident.alternativeContact,
            activeStatuses: utils.convertoLowerCase(transfer.activeStatus),
            ownershipStatus: transfer.ownershipStatus,
            Owerships: utils.convertoLowerCase(transfer.ownershipStatus),
            activeStatus: transfer.activeStatus,
            flat: transfer.flat.name,
            floor: transfer.flat.floor.name,
            block: transfer.flat.floor.block.name,
            complex: transfer.flat.floor.block.complex.name
        }));
    }
}

export default new PropertyTransformer();
