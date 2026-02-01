"use client";

import Script from "next/script";
import { useAuth } from "@/contexts/auth-context";

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    renderButton: (element: HTMLElement, config: any) => void;
                    prompt: () => void;
                };
            };
        };
    }
}

interface GoogleSignInButtonProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function GoogleSignInButton({ onSuccess, onError }: GoogleSignInButtonProps) {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

    const handleCredentialResponse = async (response: any) => {
        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ credential: response.credential }),
            });

            const data = await apiResponse.json();

            if (!apiResponse.ok) {
                throw new Error(data.message || "Google authentication failed");
            }

            // Store tokens and user data
            localStorage.setItem("accessToken", data.tokens.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Trigger page reload to update auth state
            window.location.href = data.user.role === "ADMIN"
                ? "/admin"
                : data.user.role === "LANDLORD"
                    ? "/landlord"
                    : "/dashboard";

            onSuccess?.();
        } catch (error: any) {
            console.error("Google sign-in error:", error);
            onError?.(error.message || "Failed to sign in with Google");
        }
    };

    return (
        <>
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onLoad={() => {
                    if (window.google && GOOGLE_CLIENT_ID) {
                        window.google.accounts.id.initialize({
                            client_id: GOOGLE_CLIENT_ID,
                            callback: handleCredentialResponse,
                        });

                        const buttonElement = document.getElementById("google-signin-button");
                        if (buttonElement) {
                            window.google.accounts.id.renderButton(buttonElement, {
                                theme: "outline",
                                size: "large",
                                width: "100%",
                                text: "continue_with",
                            });
                        }
                    }
                }}
            />
            <div id="google-signin-button" className="w-full flex justify-center" />
            {!GOOGLE_CLIENT_ID && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                    Google Sign-In not configured
                </p>
            )}
        </>
    );
}
