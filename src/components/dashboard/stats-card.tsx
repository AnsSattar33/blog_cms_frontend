"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatsVariant = "blurple" | "green" | "amber";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  variant?: StatsVariant;
  className?: string;
}

const iconVariantClass: Record<StatsVariant, string> = {
  blurple: "dash-stat-icon-blurple",
  green: "dash-stat-icon-green",
  amber: "dash-stat-icon-amber",
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  variant = "blurple",
  className,
}: StatsCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <div className={cn("dash-stat-card rounded-xl p-5", className)}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-(--dash-text-muted)">
              {title}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-(--dash-text)">
              {value}
            </p>
            {description && (
              <p className="mt-1 text-xs text-(--dash-text-subtle)">
                {description}
              </p>
            )}
          </div>
          <div className={cn("dash-stat-icon-wrap", iconVariantClass[variant])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
