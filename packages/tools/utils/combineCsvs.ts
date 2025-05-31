import * as XLSX from './vendor/xlsx.full.min.js'

function parseCsvData(csvData: string): Record<string, string>[] {
  const rows = csvData.split('\n').map(row => row.split(','))
  const headers = rows[0]
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {}
    headers.forEach((header, index) => {
      obj[header] = row[index]
    })
    return obj
  })
}

function parseExcelData(data: unknown): unknown[] {
  const workbook = XLSX.read(data, { type: 'binary' })
  const sheetName = workbook.SheetNames[0]
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
}

function generateCsvOutput(combinedData: Record<string, unknown>[]): string {
  if (combinedData.length === 0)
    return ''

  const headers = Object.keys(combinedData[0]).join(',')
  const rows = combinedData
    .map((row: Record<string, unknown>) => Object.values(row).join(','))
    .join('\n')

  return `${headers}\n${rows}`
}

export function combineCsvs(files: FileList): Promise<string> {
  return new Promise((resolve, reject) => {
    const combinedData: unknown[] = []
    let filesProcessed = 0

    const processFile = (file: File): void => {
      const reader = new FileReader()

      reader.onload = (e): void => {
        const fileExt = file.name.split('.').pop()?.toLowerCase()
        let data

        try {
          if (fileExt === 'csv') {
            const csvData = e.target?.result as string
            data = parseCsvData(csvData)
          }
          else if (fileExt === 'xls' || fileExt === 'xlsx') {
            data = parseExcelData(e.target?.result)
          }

          if (data) {
            combinedData.push(...data)
          }

          filesProcessed++

          if (filesProcessed === files.length) {
            const csv = generateCsvOutput(combinedData as Record<string, unknown>[])
            resolve(csv)
          }
        }
        catch (error) {
          reject(error)
        }
      }

      reader.onerror = (): void => reject(reader.error)

      if (file.name.endsWith('.csv')) {
        reader.readAsText(file)
      }
      else {
        reader.readAsBinaryString(file)
      }
    }

    Array.from(files).forEach(processFile)
  })
}
