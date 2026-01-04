import React from "react";

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const ExperienceItem = ({ title, company, location, period, description }: ExperienceItemProps) => {
  return (
    <div className="group relative pl-8 pb-12 border-l-2 border-border last:border-0 last:pb-0">
      {/* Timeline Bullet */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-border group-hover:bg-primary transition-colors duration-300" />

      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-primary font-medium font-inter">{company} · {location}</p>
          </div>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-muted text-muted-foreground h-fit self-start md:self-center shadow-sm font-inter">
            {period}
          </span>
        </div>

        <ul className="space-y-2">
          {description.map((item, index) => (
            <li key={index} className="text-muted-foreground flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-primary/40 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceItem;
