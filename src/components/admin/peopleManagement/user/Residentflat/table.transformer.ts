import { ResidentFlat_GetResidentFlatsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';

class ResidentflatTransformer extends Transformer<ResidentFlat_GetResidentFlatsQuery> {
    transforms(transfers: ResidentFlat_GetResidentFlatsQuery) {
        return transfers.residentFlat_getResidentFlats.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Name: transfer.resident.firstName + ' ' + transfer.resident.lastName,
            Phone: transfer.resident.phoneNumber,
            email: transfer.resident.email,
            firstName: transfer.resident.firstName,
            lastName: transfer.resident.lastName,
            approvalStatus: transfer.approvalStatus,
            approvalStatustext: Utils.convertoLowerCase(transfer.approvalStatus),
            activeStatus: transfer.activeStatus,
            activeStatuses: Utils.convertoLowerCase(transfer.activeStatus),
            gender: transfer.resident.gender,
            gendertext: Utils.convertoLowerCase(transfer.resident.gender),
            primaryContact: transfer.resident.alternativeContact,
            ownershipStatustext: Utils.convertoLowerCase(transfer.ownershipStatus),
            ownershipStatus: transfer.ownershipStatus,
            idResident: transfer.resident.id,
            From:
                transfer.flat.floor.block.complex.name +
                ' ,' +
                transfer.flat.floor.block.name +
                ' ,' +
                transfer.flat.floor.name +
                ' ,' +
                transfer.flat.name,
            complexId: transfer.flat.floor.block.complex.id,
            blockId: transfer.flat.floor.block.id,
            floorId: transfer.flat.floor.id,
            flatId: transfer.flatId
        }));
    }
}

export default new ResidentflatTransformer();
