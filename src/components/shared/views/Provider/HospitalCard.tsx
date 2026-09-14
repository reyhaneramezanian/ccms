
import { MText } from '@/components/base/MText';
import styled from '@emotion/styled';
import { Spacer } from 'src/components/base/spacer';
import shortid from 'shortid';
import { useGetHospitalDetails } from 'src/graphql/hospital/useHospital';
import { ViewsLoading } from '../ViewsLoadingHOC';
import { useGetMedicalBeautyCenterDetails } from 'src/graphql/mbc/useGetMedicalBeautyCenterDetails';
import { toTitleCase } from '@/utils/regex/regex';

const HospitalCardContainer = styled.div({
    boxShadow: '0px 0px 5px 2px #E6E6E6',
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white'
});
const HospitalRow = styled.div({
    minWidth: '300px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 33%)',
    justifyContent: 'space-between'
});
const HospitalName = styled(MText)({
    minWidth: '50px',
    height: 'fit-content',
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#4090D0',
    backgroundColor: '#9ed4ff',
    border: '1px #4090D0 solid',
    padding: '2px',
    borderRadius: '2px'
});

const SpaceTextContainer = styled.div({
    display: 'flex',
    // width: '100%'
});
const WorkingTimeContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
});

const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

function HospitalCard({ hospitals, title, isMbc }: { hospitals?: any, title: string, isMbc?: boolean }) {
    const groupeBy = isMbc ? 'medicalBeautyCenterId' : 'hospitalId'
    const groupedHospitals = groupBy(hospitals, groupeBy);
    return (
        <div>
            <MText variant="h6" fontWeight="bold">
                {title}
            </MText>
            <Spacer space="12px" />
            <HospitalCardContainer>
                {groupedHospitals && Object.keys(groupedHospitals)?.map((key, index) => {
                    const items = groupedHospitals[key]
                    const { data, isLoading } = isMbc ? useGetMedicalBeautyCenterDetails(Number(key)) : useGetHospitalDetails(Number(key));
                    const title = isMbc ? data?.mbc_getMedicalBeautyCenterDetails?.result?.medicalBeautyCenter?.title : data?.hospital_getHospitalDetails?.result?.hospital?.title;
                    return (
                        <ViewsLoading key={shortid.generate()} isLoading={isLoading}>
                            <HospitalRow key={shortid.generate()}>
                                <HospitalName variant="body3" color="#4090D0">{title}</HospitalName>
                                <WorkingTimeContainer>
                                    {items.map((item) => (
                                        <HospitalRow key={shortid.generate()}>
                                            <MText variant="body3" color="gray">{toTitleCase(item.dayOfWeek)}</MText>
                                            <SpaceTextContainer>
                                                <MText variant="body3">Start</MText>
                                                <Spacer space="5px" />
                                                <MText variant="body3" color="gray">{item.startHoure}</MText>
                                            </SpaceTextContainer>
                                            <SpaceTextContainer>
                                                <MText variant="body3">End</MText>
                                                <Spacer space="5px" />
                                                <MText variant="body3" color="gray">{item.endHoure}</MText>
                                            </SpaceTextContainer>
                                        </HospitalRow>

                                    ))}
                                </WorkingTimeContainer>

                            </HospitalRow>
                            <Spacer space="10px" />
                        </ViewsLoading>

                    )
                })}

            </HospitalCardContainer>
        </div>
    )
}

export default HospitalCard
