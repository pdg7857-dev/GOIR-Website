import * as React from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("panel relative overflow-hidden", className)} {...rest}>
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  hint,
  action,
  className,
}: {
  title: React.ReactNode;
  hint?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("panel-header", className)}>
      <div className="min-w-0">
        <div className="panel-title truncate">{title}</div>
        {hint ? <div className="mt-0.5 text-xs text-fg-subtle truncate">{hint}</div> : null}
      </div>
      {action}
    </div>
  );
}

export function PanelBody({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-4", className)} {...rest}>
      {children}
    </div>
  );
}
