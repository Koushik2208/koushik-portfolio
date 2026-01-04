import Section from "@/components/portfolio/Section";
import ExperienceItem from "@/components/portfolio/ExperienceItem";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ExperiencePage() {
    return (
        <main className="min-h-screen">
            <Section id="experience" title="Professional Journey" subtitle="My experience in software development and beyond.">
                <div className="max-w-4xl mx-auto">
                    <ExperienceItem
                        title="Junior Full Stack Developer"
                        company="SAS Estetica Solutions Pvt. Ltd."
                        location="Hyderabad"
                        period="Sep 2025 – Present"
                        description={[
                            "Building a CRM platform for the beauty & wellness industry",
                            "Developing responsive UI components using React.js",
                            "Integrating REST APIs for appointments, vendors, and inventory",
                            "Implementing form validation with React Hook Form and Yup"
                        ]}
                    />
                    <ExperienceItem
                        title="Software Trainee Associate"
                        company="KriSanTec Solutions"
                        location="Hyderabad"
                        period="May 2023 – Jan 2025"
                        description={[
                            "Developed UIs for multiple React and React Native projects",
                            "Built Android apps with focus on usability and performance",
                            "Integrated APIs and collaborated via Git-based workflows"
                        ]}
                    />
                    <ExperienceItem
                        title="Software Engineer"
                        company="Ideabytes Software Solutions"
                        location="Hyderabad"
                        period="May 2022 – Jan 2023"
                        description={[
                            "Worked on an IoT tank monitoring project",
                            "Developed JavaScript data-processing logic",
                            "Tested and validated APIs using Postman"
                        ]}
                    />
                </div>

                <div className="mt-20 text-center">
                    <Button size="lg" className="shadow-md">
                        <Download size={18} className="mr-2" /> Download Full Resume
                    </Button>
                </div>
            </Section>
        </main>
    );
}
