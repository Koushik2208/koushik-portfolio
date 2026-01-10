import { Schema, model, models, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Tiptap JSON
  coverImage?: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String, // HTML Content
      required: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
    },
    seo: {
      title: String,
      description: String,
      ogImage: String,
    },
    author: {
      type: String,
      required: true,
      default: 'Koushik Gorre',
    },
  },
  { timestamps: true }
);

// Slug + publish handling
BlogSchema.pre('save', function () {
  if (this.isModified('title') || this.isNew) {
    this.slug = generateSlug(this.title);
  }

  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

BlogSchema.index({ publishedAt: -1 });

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const Blog = models.Blog || model<IBlog>('Blog', BlogSchema);
export default Blog;
