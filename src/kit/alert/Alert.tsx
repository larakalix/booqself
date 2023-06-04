import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive",
                info: "text-blue-400 border-blue-800/50 dark:border-blue-800 [&>svg]:text-blue-400 text-blue-400",
                success:
                    "text-green-400 border-green-800/50 dark:border-green-800 [&>svg]:text-green-400 text-green-400",
                warning:
                    "text-yellow-400 border-yellow-800/50 dark:border-yellow-800 [&>svg]:text-yellow-400 text-yellow-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Alert = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
));
Alert.displayName = "Alert";

const AlertTitle = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-medium leading-none tracking-", className)}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
