import useTranslation from '@/i18n/hooks/useTranslation';
import XLSX from 'xlsx';

export const excelReader = (
    file: File,
    jsonCB?: (json: any) => void,
    htmlCB?: (html: string) => void
) => {
    const reader = new FileReader();

    reader.onload = function (e: any) {
        const data = new Uint8Array(e?.target?.result);
        const workbook = XLSX.read(data, { type: 'array' });

        if (jsonCB) {
            jsonCB(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
        }

        if (htmlCB) {
            htmlCB(XLSX.utils.sheet_to_html(workbook.Sheets[workbook.SheetNames[0]]));
        }
    };

    reader.readAsArrayBuffer(file);
};

export async function xlsxExporter(json: any) {
    const ws = XLSX.utils.json_to_sheet(json);
    const wb = XLSX.utils.book_new();

    await XLSX.utils.book_append_sheet(wb, ws, 'employee');

    const name = `${new Date().getTime().toString()}.xlsx`;

    XLSX.writeFile(wb, name, { type: 'file' });
}

export function useGetReports() {
    const { t } = useTranslation();

    function getReports(rows: any) {
        if (!rows || rows.length === 0) return;

        const newRows = rows.map((row) => {
            const enteries = Object.entries(row).filter(([key]) => key !== '_');
            const translateEntries = enteries.map(([key, value]) => [t(key) || key, value]);

            return Object.fromEntries(translateEntries);
        });

        xlsxExporter(newRows);
    }

    return { getReports };
}
