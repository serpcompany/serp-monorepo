import { customType } from 'drizzle-orm/pg-core'

// Custom types
export const ltree = customType<{ data: string }>({
  dataType() {
    return 'ltree'
  },
})
