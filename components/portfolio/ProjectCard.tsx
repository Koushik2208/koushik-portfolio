import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl }: ProjectCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md font-inter">
      <CardHeader>
        <CardAction className="flex space-x-3">
          {githubUrl && (
            <Link href={githubUrl} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={20} />
            </Link>
          )}
          {liveUrl && (
            <Link href={liveUrl} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowUpRight size={20} />
            </Link>
          )}
        </CardAction>
        <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold bg-muted text-muted-foreground group-hover:opacity-80 transition-opacity shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
