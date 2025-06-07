import { z } from 'zod'

/**
 * Schema for validating proposed changes in edit submissions
 * This validates the dynamic fields that can be edited for an entity
 */
export const editProposedChangesSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  categories: z.array(z.number().positive()).optional(),
  topics: z.array(z.number().positive()).optional(),
  features: z.array(z.string()).optional(),
  pricing: z.string().optional(),
  founded: z.string().optional(),
  employees: z.string().optional(),
  revenue: z.string().optional(),
  funding: z.string().optional(),
}).strict().superRefine((data, ctx) => {
  // Check if at least one field is provided
  const hasValidField = Object.entries(data).some(([, value]) => {
    if (typeof value === 'string')
      return value.length > 0
    if (Array.isArray(value))
      return value.length > 0
    return value !== undefined && value !== null
  })

  if (!hasValidField) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'At least one field must be provided for edit',
    })
  }
})

/**
 * Schema for edit submission request body
 */
export const editSubmissionSchema = editProposedChangesSchema

/**
 * Schema for edit update request (admin/owner)
 */
export const editUpdateSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
  reviewNotes: z.string().optional(),
})

export type EditProposedChanges = z.infer<typeof editProposedChangesSchema>
export type EditSubmission = z.infer<typeof editSubmissionSchema>
export type EditUpdate = z.infer<typeof editUpdateSchema>
