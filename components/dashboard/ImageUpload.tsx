"use client";

import React from "react";
import { AssetSelector } from "./AssetSelector";
import { ImageIcon, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    folderPath?: string;
    className?: string;
    label?: string;
}

export function ImageUpload({
    value,
    onChange,
    folderPath = "portfolio/test",
    className,
    label = "Cover Image",
}: ImageUploadProps) {
    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onChange("");
    };

    return (
        <div className={cn("space-y-2", className)}>
            {label && <p className="text-sm font-bold font-inter uppercase tracking-wider text-muted-foreground">{label}</p>}

            <AssetSelector
                folderPath={folderPath}
                onSelect={onChange}
                trigger={
                    <div className="relative group cursor-pointer">
                        {value ? (
                            <div className="relative aspect-video md:aspect-21/9 w-full overflow-hidden border-2 border-muted hover:border-primary/50 transition-all shadow-sm">
                                <img
                                    src={value}
                                    alt="Uploaded"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <div className="bg-background p-2 shadow-xl text-foreground">
                                        <Edit2 size={18} />
                                    </div>
                                    <button
                                        onClick={handleRemove}
                                        className="bg-destructive p-2 shadow-xl text-destructive-foreground hover:bg-destructive/90 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="aspect-video md:aspect-21/9 w-full border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group">
                                <div className="p-3 bg-muted group-hover:bg-primary/10 transition-colors">
                                    <ImageIcon size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors font-inter">
                                    Click to select from library
                                </p>
                            </div>
                        )}
                    </div>
                }
            />
        </div>
    );
}
