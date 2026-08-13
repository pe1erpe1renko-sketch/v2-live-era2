import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  children?: ReactNode;
};

/** Client-side link that accepts a plain href string (incl. query params). */
export function AppLink({ href, children, ...rest }: Props) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link to={href as any} {...(rest as any)}>
      {children}
    </Link>
  );
}
