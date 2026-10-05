import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import "../components.css";

type ButtonProps = {
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  /** When set, renders a router <Link> instead of a <button>. */
  to?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export default function Button({
  variant = "primary",
  size = "md",
  to,
  children,
  ...rest
}: ButtonProps) {
  const className = `btn btn--${variant} btn--${size}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
}