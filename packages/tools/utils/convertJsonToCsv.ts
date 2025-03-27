export function convertJsonToCsv(jsonInput: string): string {
  const parsedJson_ = JSON.parse(jsonInput);
  const parsedJson = Array.isArray(parsedJson_) ? parsedJson_ : [parsedJson_];
  const csv =
    Object.keys(parsedJson[0]).join(',') +
    '\n' +
    parsedJson
      .map((row: Record<string, unknown>) => Object.values(row).join(','))
      .join('\n');
  return csv;
}
