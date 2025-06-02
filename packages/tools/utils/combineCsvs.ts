import * as XLSX from './vendor/xlsx.full.min.js'

export function combineCsvs(files: FileList): Promise<string> {
  return new Promise((resolve, reject) => {
    const combinedData: unknown[] = []
    let filesProcessed = 0

    const processFile = (file: File): void => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const fileExt = file.name.split('.').pop()?.toLowerCase()
        let data

        try {
          if (fileExt === 'csv') {
            const csvData = e.target?.result as string
            const rows = csvData.split('\n').map(row => row.split(','))
            const headers = rows[0]
            const jsonData = rows.slice(1).map((row) => {
              const obj: Record<string, string> = {}
              headers.forEach((header, index) => {
                obj[header] = row[index]
              })
              return obj
            })
            data = jsonData
          }
          else if (fileExt === 'xls' || fileExt === 'xlsx') {
            const workbook = XLSX.read(e.target?.result, { type: 'binary' })
            const sheetName = workbook.SheetNames[0]
            data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
          }

          if (data) {
            combinedData.push(...data)
          }

          filesProcessed++

          if (filesProcessed === files.length) {
            const csv
              = `${Object.keys(combinedData[0]).join(',')
              }\n${
                combinedData
                  .map((row: Record<string, unknown>) =>
                    Object.values(row).join(','),
                  )
                  .join('\n')}`
            resolve(csv)
          }
        }
        catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => reject(reader.error)

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
// CI trigger comment
