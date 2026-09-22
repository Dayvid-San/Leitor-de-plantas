"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await forgotPassword(email);
    } catch {
      // Ignored: we show the same message either way so the endpoint can't be used
      // to check which emails have an account.
    } finally {
      setStatus("sent");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "sent" ? (
            <div className="flex flex-col gap-4 text-center">
              <p className="text-sm text-muted-foreground">
                If an account exists for that email, a password reset link has been sent to it.
              </p>
              <Link href="/admin" className="text-sm text-primary hover:underline">
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-2" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending..." : "Send reset link"}
              </Button>
              <Link href="/admin" className="text-sm text-center text-muted-foreground hover:underline">
                Back to login
              </Link>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
