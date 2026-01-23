import React from "react";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  asymmetric?: boolean;
}

const Section = ({ id, title, subtitle, children, className = "", dark = false, asymmetric = false }: SectionProps) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 ${dark ? "bg-muted/30" : "bg-transparent"} ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-24">
        {(title || subtitle) && (
          <div className={`mb-16 max-w-4xl ${asymmetric ? "lg:ml-12" : ""}`}>
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="h-1.5 w-12 bg-primary mt-10 shadow-sm" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
