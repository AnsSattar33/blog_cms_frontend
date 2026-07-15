import { Suspense } from "react";
import { LoginForm } from "@/components/forms/login-form";
import { Container } from "@/components/layout/container";

export default function LoginPage() {
  return (
    <div className="discord-gradient-mesh flex min-h-screen items-center justify-center py-12">
      <Container className="flex flex-col items-center justify-center">
        <h1 className="mb-6 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
          Administrator Login
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </Container>
    </div>
  );
}
