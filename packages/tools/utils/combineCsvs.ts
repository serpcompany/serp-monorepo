import Papa from 'papaparse';
import * as XLSX from './vendor/xlsx.full.min.js';

export function combineCsvs(files: FileList): Promise<string> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const combinedData: any[] = [];
    let filesProcessed = 0;

    const processFile = (file: File) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        let data;

        try {
          if (fileExt === 'csv') {
            data = Papa.parse(e.target?.result as string, {
              header: true
            }).data;
          } else if (fileExt === 'xls' || fileExt === 'xlsx') {
            const workbook = XLSX.read(e.target?.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          }

          if (data) {
            combinedData.push(...data);
          }

          filesProcessed++;

          if (filesProcessed === files.length) {
            const csv = Papa.unparse(combinedData);
            resolve(csv);
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(reader.error);

      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    };

    Array.from(files).forEach(processFile);
  });
}
