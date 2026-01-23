"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSent(true);
    };

    if (isSent) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 animate-in zoom-in duration-500">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold ">Message Sent!</h3>
                <p className="text-muted-foreground font-inter max-w-xs">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <Button variant="outline" onClick={() => setIsSent(false)} className="mt-6">
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Name</Label>
                <Input id="name" placeholder="John Doe" required className="bg-background/50 border-muted-foreground/20 focus:border-primary h-12" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required className="bg-background/50 border-muted-foreground/20 focus:border-primary h-12" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Message</Label>
                <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    required
                    className="bg-background/50 border-muted-foreground/20 focus:border-primary min-h-[150px] resize-none"
                />
            </div>

            <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 animate-spin" size={18} /> Sending...
                    </>
                ) : (
                    <>
                        Send Message <Send className="ml-2" size={18} />
                    </>
                )}
            </Button>
        </form>
    );
}
