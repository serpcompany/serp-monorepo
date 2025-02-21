import Papa from 'papaparse';

export function convertJsonToCsv(jsonInput: string): string {
  const parsedJson = JSON.parse(jsonInput);
  const csv = Papa.unparse(parsedJson);
  return csv;
}
