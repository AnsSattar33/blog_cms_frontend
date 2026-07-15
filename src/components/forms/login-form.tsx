"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginSchema, type LoginFormValues } from "@/schemas/login.schema";
import { authService } from "@/services/auth.service";
import { parseApiError } from "@/lib/api-error";

export function LoginForm() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const redirectParam = searchParams.get("redirect");
  const redirect =
    redirectParam?.startsWith("/dashboard") ? redirectParam : "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await authService.login(values);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Signed in successfully");
      window.location.assign(redirect);
    } catch (error) {
      toast.error(parseApiError(error).message);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-xl border-surface-indigo bg-surface-indigo shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-2xl uppercase">
          Administrator Login
        </CardTitle>
        <CardDescription>
          Sign in to access the Admin Dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Access Dashboard
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
