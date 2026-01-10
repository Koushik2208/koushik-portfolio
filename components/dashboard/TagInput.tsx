"use client";

import * as React from "react";
import { X } from "lucide-react";

interface TagInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export function TagInput({
    value,
    onChange,
    placeholder = "React, TypeScript, Node.js"
}: TagInputProps) {
    const [inputValue, setInputValue] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const tag = inputValue.trim();
            if (tag && !value.includes(tag)) {
                onChange([...value, tag]);
                setInputValue("");
            }
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
            onChange(value.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter((tag) => tag !== tagToRemove));
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData("text");
        if (paste.includes(",")) {
            e.preventDefault();
            const newTags = paste
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag && !value.includes(tag));

            if (newTags.length > 0) {
                onChange([...value, ...newTags]);
            }
        }
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background min-h-[44px] items-center transition-all">
            {value.map((tag, index) => (
                <span
                    key={index}
                    className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded border border-primary/20"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive transition-colors focus:outline-none"
                    >
                        <X size={12} />
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={value.length === 0 ? placeholder : ""}
                className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px] placeholder:text-muted-foreground/60 h-8 font-inter"
            />
        </div>
    );
}
