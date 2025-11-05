import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 17.5C14.5 19.433 16.067 21 18 21s3.5-1.567 3.5-3.5S19.933 14 18 14s-3.5 1.567-3.5 3.5Z" />
      <path d="m14 14-1.5 1.5" />
      <path d="M12.5 9.75A4.75 4.75 0 0 0 3 9.75c0 4.386 3.5 6.25 5.25 8.75" />
      <path d="M12.5 9.75A4.75 4.75 0 0 1 22 9.75c-1.125 2-2.25 3.625-3.75 4.75" />
      <path d="M12.5 3.75c-2.5 2.5-3.125 4.375-2.5 6" />
      <path d="M14.5 3.75c.625 2.5-1.25 5-3.75 6.25" />
    </svg>
  );
}
