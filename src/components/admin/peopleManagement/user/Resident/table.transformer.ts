import { User_GetResidentsQuery } from 'src/graphql/generated';
import Transformer from '@/utils/transformer';
import Utils from '@/utils/utils';

class ResidentTransformer extends Transformer<User_GetResidentsQuery> {
    transforms(transfers: User_GetResidentsQuery) {
        return transfers.user_getResidents.result.items.map((transfer) => ({
            Check: false,
            id: transfer.id,
            Name: transfer.firstName + ' ' + transfer.lastName,
            Phone: transfer.phoneNumber,
            Email: transfer.email,
            firstName: transfer.firstName,
            lastName: transfer.lastName,
            Middlename: transfer.middleName,
            activeStatus: transfer.activeStatus,
            activeStatuses: Utils.convertoLowerCase(transfer.activeStatus),
            gender: transfer.gender,
            gendertext: Utils.convertoLowerCase(transfer.gender),
            dateOfBirth: transfer.dateOfBirth.slice(0, 10),
            dateOfBirths: transfer.dateOfBirth.slice(0, 10).replaceAll('-', '/'),
            primaryContact: transfer.alternativeContact,
            Owerships: transfer.residentFlats.map((item) =>
                Utils.convertoLowerCase(item.ownershipStatus)
            ),
            Owership: transfer.residentFlats.map((item) => item.ownershipStatus),
            From: transfer.residentFlats.map(
                (item) =>
                    item.flat.floor.block.complex.name +
                    ' ,' +
                    item.flat.floor.block.name +
                    ' ,' +
                    item.flat.floor.name +
                    ' ,' +
                    item.flat.name
            ),
            Complex: transfer.residentFlats.map((item) => item.flat.floor.block.complex.id),
            Block: transfer.residentFlats.map((item) => item.flat.floor.block.id),
            Floor: transfer.residentFlats.map((item) => item.flat.floor.id),
            Flat: transfer.residentFlats.map((item) => item.flatId),
            idresident: transfer.residentFlats.map((item) => item.id),
            residentId: transfer.residentFlats.map((item) => item.residentId),
            Complexname: transfer.residentFlats.map((item) => item.flat.floor.block.complex.name),
            Blockname: transfer.residentFlats.map((item) => item.flat.floor.block.name),
            Floorname: transfer.residentFlats.map((item) => item.flat.floor.name),
            Flatname: transfer.residentFlats.map((item) => item.flat.name),
            photoUrl: transfer.photoUrl
        }));
    }
}

export default new ResidentTransformer();
