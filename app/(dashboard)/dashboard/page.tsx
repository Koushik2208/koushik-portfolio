export default async function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="text-muted-foreground max-w-xl">
                This is your private space to shape how your work is seen — from projects
                and writing to experiments with AI and content. Build slowly, publish
                intentionally.
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="h-32 border rounded-xl bg-card p-4">
                    <p className="text-sm text-muted-foreground">Writing</p>
                    <p className="mt-2 text-lg font-semibold">
                        Draft, refine, and publish thoughts that reflect how you think.
                    </p>
                </div>

                <div className="h-32 border rounded-xl bg-card p-4">
                    <p className="text-sm text-muted-foreground">Projects</p>
                    <p className="mt-2 text-lg font-semibold">
                        Curate work that shows depth, not just delivery.
                    </p>
                </div>

                <div className="h-32 border rounded-xl bg-card p-4">
                    <p className="text-sm text-muted-foreground">Experiments</p>
                    <p className="mt-2 text-lg font-semibold">
                        Explore ideas — AI, content systems, workflows — in public or private.
                    </p>
                </div>
            </div>
        </div>
    );
}
