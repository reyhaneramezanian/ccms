import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { CustomFlex, CustomParagraph } from './index';
import { Bar } from 'react-chartjs-2';
import { useHealingType_GetAllHealingTypesQuery } from 'src/graphql/generated';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: null,
        title: null,
    },
    scales: {
        y: {
            grid: {
                display: false
            },
            ticks: {
                color: '#213950',
                font: {
                    size: '14px',
                    weight: 'bold'
                }

            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#213950',
                font: {
                    size: '14px',
                }
            }
        },

    }
};


const ChartLineHealer = () => {
    const {data:dataHealingType,isLoading} = useHealingType_GetAllHealingTypesQuery({skip:0,take:10})
    const items = dataHealingType?.healingType_getAllHealingTypes?.result?.items || [];

    const allvisitor = useMemo(() => {
        return items?.reduce((acc, cur) => {
            const key = cur.title

            return {
                ...acc,
                [key]: acc[key] ? acc[key] + cur?.userHealingTypeInterfaces?.length : cur?.userHealingTypeInterfaces?.length
            };
        }, {});
    }, [dataHealingType,isLoading]);

  
    const data = {
        labels: Object?.keys(allvisitor)?.map((item) => item),
        datasets: [
            {
                label: '',
                data: Object?.values(allvisitor).map((item) => item),
                backgroundColor: '#724F93',
                barThickness: 30,
                borderRadius: 0,
            },
        ],
    };

    return (
        <>
            <p style={{ color: '#213950', fontSize: '16px' }}>Providers</p>
            <CustomFlex>
                <div style={{ width: '100%' }}><Bar options={options} data={data} /></div>
                <CustomParagraph>Category</CustomParagraph>
            </CustomFlex>

        </>

    );
}

export default ChartLineHealer;
