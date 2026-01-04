import React from "react";

interface SkillBadgeProps {
  name: string;
  category?: string;
}

const SkillBadge = ({ name }: SkillBadgeProps) => {
  return (
    <span className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:bg-primary/5 transition-all duration-200 cursor-default font-inter">
      {name}
    </span>
  );
};

export default SkillBadge;
