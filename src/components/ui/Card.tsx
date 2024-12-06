import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        'rounded-lg border bg-white shadow-sm',
        className
      )}
      {...props}
    />
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

Card.Header = function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={twMerge('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

Card.Content = function CardContent({ className, ...props }: CardContentProps) {
  return <div className={twMerge('p-6 pt-0', className)} {...props} />;
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

Card.Footer = function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={twMerge('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
};