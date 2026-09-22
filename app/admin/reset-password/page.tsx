"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ResetPasswordForm() {
  const token = useSearchParams().get("token") ?? "";
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
      setDone(true);
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err: any) {
      setError(err.message ?? "This reset link is invalid or has expired.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          This link is missing its reset token. Request a new one below.
        </p>
        <Link href="/admin/forgot-password" className="text-sm text-primary hover:underline">
          Request a new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <p className="text-sm text-center text-muted-foreground">
        Password updated. Redirecting to login...
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm mb-1">New password</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md bg-background text-foreground"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Confirm new password</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md bg-background text-foreground"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Set new password"}
      </Button>
    </form>
  );
}

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Set New Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
