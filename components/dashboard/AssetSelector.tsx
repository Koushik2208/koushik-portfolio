"use client";

import { useEffect, useState, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Loader2, ImageIcon, AlertCircle, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { upload } from "@imagekit/next";

type Asset = {
    id: string;
    name: string;
    url: string;
    thumbnailUrl: string;
    type: string;
    path: string;
};

interface AssetSelectorProps {
    folderPath?: string;
    onSelect: (url: string) => void;
    trigger?: React.ReactNode;
}

export function AssetSelector({
    folderPath = "/portfolio",
    onSelect,
    trigger
}: AssetSelectorProps) {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (isOpen) {
            loadAssets();
        }
    }, [isOpen]);

    const loadAssets = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/assets?folder=${encodeURIComponent(folderPath)}&limit=50`);

            if (!res.ok) throw new Error("Failed to load assets");

            const data = await res.json();
            setAssets(data);
        } catch (err) {
            setError("Could not load images from ImageKit.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            setIsOpen(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            setUploadProgress(0);
            setError(null);

            // 1. Get auth params from your API
            const authRes = await fetch('/api/upload-auth');
            if (!authRes.ok) throw new Error('Auth failed');
            const { token, expire, signature, publicKey } = await authRes.json();

            // 2. Call upload with explicit auth fields
            const response = await upload({
                file,
                fileName: file.name,
                folder: folderPath,
                token,
                expire,
                signature,
                publicKey,
                onProgress: (event) => {
                    setUploadProgress(Math.round((event.loaded / event.total) * 100));
                },
            });

            if (response.url) {
                await loadAssets();
                setSelectedUrl(response.url);
            }
        } catch (err) {
            setError("Failed to upload image.");
            console.error(err);
        } finally {
            setUploading(false);
            setUploadProgress(0);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="gap-2">
                        <ImageIcon size={16} />
                        Select Image
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden border-none shadow-2xl rounded-none">
                <DialogHeader className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-2 text-xl font-bold font-inter">
                            <ImageIcon className="text-primary" size={20} />
                            Image Library
                            <span className="text-xs font-normal text-muted-foreground ml-2 font-mono">
                                {folderPath}
                            </span>
                        </DialogTitle>
                        <div className="flex items-center gap-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleUpload}
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading || loading}
                                className="gap-2 mr-4"
                            >
                                {uploading ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                ) : (
                                    <Upload size={16} />
                                )}
                                {uploading ? `Uploading ${uploadProgress}%` : "Upload Image"}
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground animate-pulse font-inter">Syncing with ImageKit...</p>
                        </div>
                    ) : error ? (
                        <div className="h-full flex flex-col items-center justify-center gap-3 py-20 text-destructive">
                            <AlertCircle size={32} />
                            <p className="text-sm font-medium">{error}</p>
                            <Button variant="outline" size="sm" onClick={loadAssets} className="mt-2">Try Again</Button>
                        </div>
                    ) : assets.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-2 py-20">
                            <ImageIcon size={32} className="text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground font-inter">No images found in this folder.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {assets.map((asset) => (
                                <div
                                    key={asset.id}
                                    onClick={() => setSelectedUrl(asset.url)}
                                    className={cn(
                                        "group relative aspect-square border-2 transition-all cursor-pointer overflow-hidden",
                                        selectedUrl === asset.url
                                            ? "border-primary ring-4 ring-primary/10"
                                            : "border-transparent hover:border-primary/40"
                                    )}
                                >
                                    <img
                                        src={asset.thumbnailUrl}
                                        alt={asset.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {selectedUrl === asset.url && (
                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                                            <div className="bg-primary text-primary-foreground p-1 shadow-xl">
                                                <Check size={18} strokeWidth={3} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm">
                                        <p className="text-[10px] truncate font-medium font-inter">{asset.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-inter">
                        {selectedUrl ? "Click confirm to use selected image" : "Select an image to continue"}
                    </p>
                    <div className="flex gap-3">
                        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="font-inter">Cancel</Button>
                        <Button
                            size="sm"
                            disabled={!selectedUrl || loading}
                            onClick={handleConfirm}
                            className="font-inter px-6 shadow-sm"
                        >
                            Confirm Selection
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
