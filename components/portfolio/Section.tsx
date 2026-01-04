import React from "react";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

const Section = ({ id, title, subtitle, children, className = "", dark = false }: SectionProps) => {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${dark ? "bg-muted/30" : "bg-transparent"} ${className}`}
    >
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="mb-16 max-w-2xl">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="h-1.5 w-12 bg-primary mt-6 shadow-sm" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
