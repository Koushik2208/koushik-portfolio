'use client';

import { useEffect, useState } from 'react';
import { Loader2, ImageIcon, AlertCircle } from 'lucide-react';

type Asset = {
    id: string;
    name: string;
    url: string;
    thumbnailUrl: string;
    type: string;
    path: string;
};

export default function SelectImagePage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        const loadAssets = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(
                    '/api/assets?folder=/portfolio/test&limit=50'
                );

                if (!res.ok) {
                    throw new Error('Failed to load images from ImageKit');
                }

                const data: Asset[] = await res.json();
                setAssets(data);
            } catch (err) {
                console.error(err);
                setError('Could not load images. Please check your connection or ImageKit configuration.');
            } finally {
                setLoading(false);
            }
        };

        loadAssets();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
                <ImageIcon className="text-primary w-6 h-6" />
                <h1 className="text-2xl font-bold">Select from Library</h1>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Fetching your images...</p>
                </div>
            ) : error ? (
                <div className="flex items-center gap-4 p-4 border border-destructive/20 bg-destructive/5 rounded-xl text-destructive text-sm font-medium">
                    <AlertCircle className="w-5 h-5" />
                    <p>{error}</p>
                </div>
            ) : assets.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-3xl border-border bg-muted/30">
                    <p className="text-muted-foreground">No images found in /portfolio/test.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {assets.map((asset) => (
                        <button
                            key={asset.id}
                            type="button"
                            onClick={() => setSelectedId(asset.id)}
                            className={`group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 ${selectedId === asset.id
                                ? 'border-primary ring-4 ring-primary/10'
                                : 'border-border hover:border-primary/50'
                                }`}
                        >
                            <img
                                src={asset.thumbnailUrl}
                                alt={asset.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {selectedId === asset.id && (
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-primary text-primary-foreground p-1 rounded-full shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/60 to-transparent">
                                <p className="text-[10px] text-white truncate font-medium">{asset.name}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {selectedId && (
                <div className="mt-10 p-6 bg-card rounded-3xl border border-border flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Selected Asset ID</p>
                        <code className="text-lg font-bold text-foreground bg-muted px-2 py-1 rounded-lg">{selectedId}</code>
                    </div>
                    <button
                        onClick={() => setSelectedId(null)}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Clear Selection
                    </button>
                </div>
            )}
        </div>
    );
}
