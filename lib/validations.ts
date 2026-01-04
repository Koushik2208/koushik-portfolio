import { z } from 'zod';

export const blogSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(120, 'Title cannot exceed 120 characters'),

  excerpt: z
    .string()
    .min(20, 'Excerpt must be at least 20 characters')
    .max(300, 'Excerpt cannot exceed 300 characters'),

  content: z.any(), // Tiptap JSON (validated structurally in editor)

  coverImage: z
    .string()
    .url('Invalid image URL')
    .optional(),

  tags: z
    .array(z.string().min(1))
    .optional()
    .default([]),

  status: z.enum(['draft', 'published']),

  seo: z
    .object({
      title: z.string().max(60).optional(),
      description: z.string().max(160).optional(),
      ogImage: z.string().url().optional(),
    })
    .optional(),
});

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title cannot exceed 120 characters'),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description cannot exceed 500 characters'),

  content: z.any().optional(), // Optional detailed write-up

  coverImage: z
    .string()
    .url('Invalid image URL')
    .optional(),

  techStack: z
    .array(z.string().min(1))
    .min(1, 'At least one technology is required'),

  githubUrl: z
    .string()
    .url('Invalid GitHub URL')
    .optional(),

  liveUrl: z
    .string()
    .url('Invalid live URL')
    .optional(),

  featured: z.boolean().default(false),

  status: z.enum(['draft', 'published']).default('published'),

  seo: z
    .object({
      title: z.string().max(60).optional(),
      description: z.string().max(160).optional(),
      ogImage: z.string().url().optional(),
    })
    .optional(),
});
