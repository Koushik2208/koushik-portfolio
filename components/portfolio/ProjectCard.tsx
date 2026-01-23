import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  slug?: string;
}

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl, image, slug }: ProjectCardProps) => {
  return (
    <Card className="group flex flex-col h-full overflow-hidden border-border/50 bg-card hover:border-border/80 hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      {image && (
        <div className="relative w-full aspect-video bg-muted overflow-hidden border-b border-border/50">
          {slug ? (
            <Link href={`/projects/${slug}`}>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </Link>
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-2xl font-bold  leading-tight group-hover:text-primary transition-colors">
            {slug ? <Link href={`/projects/${slug}`}>{title}</Link> : title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 pt-2 flex-1">
          <CardDescription className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto border-t border-border/40 bg-muted/5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mr-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-background border rounded-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-bold text-muted-foreground">+More</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {githubUrl && (
              <Link href={githubUrl} target="_blank" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full" title="View Source">
                <Github size={18} />
              </Link>
            )}
            {liveUrl && (
              <Link href={liveUrl} target="_blank" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full" title="Live Demo">
                <ArrowUpRight size={18} />
              </Link>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProjectCard;
