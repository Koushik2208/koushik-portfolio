import { signIn } from '@/auth';
import { Image } from '@imagekit/next';
import { AlertCircle } from "lucide-react";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground">
                    Sign in to your account to manage your portfolio.
                </p>
            </div>

            {error === "AccessDenied" && (
                <div className="flex items-center gap-3 p-4 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-4 h-4" />
                    <p className="font-medium">Access Denied: Your email is not authorized.</p>
                </div>
            )}

            <form
                action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/dashboard" })
                }}
            >
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                    <Image
                        src="https://ik.imagekit.io/jsmasterykoushik/google_IDZSYvSYK.png?updatedAt=1764486710636"
                        alt="Google Logo"
                        width={24}
                        height={24}
                        className="w-4 h-4"
                    />
                    Continue with Google
                </button>
            </form>
        </div>
    );
}
