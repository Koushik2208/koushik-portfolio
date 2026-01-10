import type { Metadata } from 'next';
import { Mail, MapPin, Linkedin, Github, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/portfolio/ContactForm";

export const metadata: Metadata = {
    title: 'Contact - Koushik Gorre',
    description: 'Get in touch for freelance projects, collaborations, or just to say hi.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header */}
                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold font-cormorant mb-4 selection:bg-primary/20">
                        Let&apos;s clean up <br className="hidden md:block" />
                        <span className="text-muted-foreground">complex ideas into</span> <span className="text-primary italic">code.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground font-inter max-w-2xl leading-relaxed">
                        Have a project in mind or just want to chat? I&apos;m currently open for new opportunities and collaborations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left: Info */}
                    <div className="space-y-12">
                        {/* Contact Details */}
                        <div className="space-y-6">
                            <h3 className="font-bold uppercase tracking-widest text-muted-foreground mb-6">Contact Info</h3>

                            <a href="mailto:gorrekoushik@gmail.com" className="flex items-start gap-4 group p-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">gorrekoushik@gmail.com</p>
                                    <p className="text-md text-muted-foreground">Drop me a line anytime!</p>
                                </div>
                            </a>

                            <div className="flex items-start gap-4 p-4 -mx-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-foreground">Hyderabad, India</p>
                                    <p className="text-md text-muted-foreground">Available for remote work worldwide.</p>
                                </div>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="space-y-4">
                            <h3 className="font-bold uppercase tracking-widest text-muted-foreground">Follow Me</h3>
                            <div className="flex gap-4">
                                <Link href="https://github.com" target="_blank" className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300">
                                    <Github size={20} />
                                </Link>
                                <Link href="https://linkedin.com" target="_blank" className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300">
                                    <Linkedin size={20} />
                                </Link>
                                <Link href="https://twitter.com" target="_blank" className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300">
                                    <Twitter size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-10 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold font-cormorant">Send a Message</h2>
                            <p className="text-muted-foreground mt-2">I usually respond quickly.</p>
                        </div>
                        <ContactForm />
                    </div>

                </div>
            </div>
        </main>
    );
}
