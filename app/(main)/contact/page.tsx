import Section from "@/components/portfolio/Section";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Section id="contact" title="Get in Touch" subtitle="Let’s build something clean, thoughtful, and useful.">
                <div className="bg-primary/5 p-12 shadow-sm text-center space-y-12 max-w-5xl mx-auto font-inter">
                    <div className="space-y-4">
                        <h3 className="text-3xl md:text-5xl font-bold font-cormorant leading-tight">
                            Working on a project? <br />
                            Or just want to say hi?
                        </h3>
                        <p className="text-xl text-muted-foreground font-cormorant">
                            I'm always open to discussing new opportunities, creative ideas or original projects.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 pt-8">
                        <a href="mailto:gorrekoushik@gmail.com" className="group flex flex-col items-center gap-4">
                            <div className="p-6 bg-background shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                <Mail size={32} />
                            </div>
                            <span className="text-lg font-medium group-hover:text-primary transition-colors">gorrekoushik@gmail.com</span>
                        </a>
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-6 bg-background shadow-sm">
                                <MapPin size={32} />
                            </div>
                            <span className="text-lg font-medium">Hyderabad, India</span>
                        </div>
                    </div>

                    <div className="space-y-6 pt-12">
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Follow Me</p>
                        <div className="flex justify-center gap-6">
                            <Link href="https://linkedin.com" target="_blank" className="p-5 bg-background shadow-sm hover:bg-primary hover:text-white transition-all">
                                <Linkedin size={28} />
                            </Link>
                            <Link href="https://github.com/gorrekoushik" target="_blank" className="p-5 bg-background shadow-sm hover:bg-primary hover:text-white transition-all">
                                <Github size={28} />
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
