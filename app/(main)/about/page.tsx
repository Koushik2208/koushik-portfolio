import Section from "@/components/portfolio/Section";
import SkillBadge from "@/components/portfolio/SkillBadge";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Section id="about" title="My Story" subtitle="Software developer by day, creator by curiosity.">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6 text-xl text-muted-foreground leading-relaxed ">
                        <p>
                            I’m a <span className="text-foreground font-semibold">Full-Stack MERN Developer with 3+ years of experience</span> building web and mobile applications using React.js, Next.js, React Native, and Node.js.
                        </p>
                        <p>
                            I enjoy crafting clean, responsive interfaces and integrating reliable APIs that translate real product requirements into usable experiences. My journey started with a fascination for how things work under the hood, leading me deep into the world of JavaScript and modern web architectures.
                        </p>
                    </div>
                    <div className="space-y-6 text-xl text-muted-foreground leading-relaxed ">
                        <p>
                            Alongside development, I’m <span className="font-semibold text-primary/80">exploring video editing and content creation</span> — still early in the journey, but deeply interested in visual storytelling, creator workflows, and learning in public. I believe that being a developer today isn't just about code; it's about communication and storytelling through technology.
                        </p>
                        <p>
                            I’m also a <span className="text-foreground font-semibold">Certified AI Generalist (GrowthSchool)</span>, actively applying AI and generative tools to practical products, especially in the context of personal branding, automation, and content systems.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Skills Section Merged into About */}
            <Section id="skills" title="Skills & Tools" dark>
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary uppercase tracking-wider font-inter">Languages & Frontend</h3>
                        <div className="flex flex-wrap gap-3">
                            {["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "React.js", "Next.js", "Redux", "React Hook Form"].map(tag => (
                                <SkillBadge key={tag} name={tag} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary uppercase tracking-wider font-inter">Mobile & Backend</h3>
                        <div className="flex flex-wrap gap-3">
                            {["React Native (Expo)", "Node.js", "Express.js", "MongoDB", "Mongoose", "Supabase"].map(tag => (
                                <SkillBadge key={tag} name={tag} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary uppercase tracking-wider font-inter">Tools & Others</h3>
                        <div className="flex flex-wrap gap-3">
                            {["Tailwind CSS", "shadcn/ui", "Git", "npm/Yarn", "Postman", "n8n", "OpenAI API"].map(tag => (
                                <SkillBadge key={tag} name={tag} />
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="beyond-code" title="Beyond Code">
                <Card className="p-4 overflow-hidden shadow-sm">
                    <CardContent className="space-y-6 pt-6">
                        <p className="text-xl text-muted-foreground leading-relaxed ">
                            When I’m not coding, I’m learning video editing, experimenting with short-form content, and exploring storytelling. I believe in <span className="text-foreground font-bold">consistent progress and building useful things</span>.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                            <div className="space-y-2">
                                <h4 className="font-bold text-foreground underline underline-offset-4 decoration-primary/30 font-inter">Certifications</h4>
                                <ul className="text-muted-foreground space-y-1 font-inter">
                                    <li>• AI Generalist Fellowship — GrowthSchool</li>
                                    <li>• Node.js API Masterclass — Brad Traversy</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Section>
        </main>
    );
}
