import React from "react";
import Link from "next/link";
import { Linkedin, Github, ExternalLink, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background py-12 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-xl font-bold text-primary">KOUSHIK</h2>
            <blockquote className="text-muted-foreground italic pl-4 max-w-sm">
              "Developer by profession. Creator by curiosity. Learning in public."
            </blockquote>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-6">
              <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://github.com/gorrekoushik" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </Link>
              <Link href="mailto:gorrekoushik@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </Link>
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink size={20} />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Koushik. Built with Next.js & Tailwind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
