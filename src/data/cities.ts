type ProvinceType = { name: string; cities: Array<string> };
export const CountryOptions = [
    {
        option: 'Iraq',
        value: 'IRAQ'
    }
];
export const WorkProvinces: Array<ProvinceType> = [
    { name: 'Sulaymaniyeh', cities: ['Sulaymaniyeh'] },
    { name: 'Erbil', cities: ['Erbil'] },
    { name: 'Duhok', cities: ['Zakho'] }
];

export const WorkProvincesOption = WorkProvinces.map((c) => ({
    option: c.name,
    value: c.name
}));
export const WorkCitiesByProvinceOption = (province: string) => {
    const idx = WorkProvinces.findIndex((p) => p.name === province);
    if (idx === -1) return [];
    return WorkProvinces[idx].cities.map((c) => ({
        option: c,
        value: c
    }));
};
export const WorkCitiesOption = WorkProvinces.flatMap((p) =>
    p.cities.flatMap((c) => ({
        option: c,
        value: c
    }))
);
export const AllCities = ['Sulaymaniyeh', 'Erbil', 'Duhok'];
