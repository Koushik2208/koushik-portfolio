import { Schema, model, models, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  content?: any; // Optional Tiptap JSON
  coverImage?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'draft' | 'published';
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
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
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    content: {
      type: String, // Optional detailed write-up (HTML)
    },
    coverImage: {
      type: String,
      trim: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    githubUrl: String,
    liveUrl: String,
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    seo: {
      title: String,
      description: String,
      ogImage: String,
    },
  },
  { timestamps: true }
);

ProjectSchema.pre('save', function () {
  if (this.isModified('title') || this.isNew) {
    this.slug = generateSlug(this.title);
  }
});

ProjectSchema.index({ featured: 1 });

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const Project =
  models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
