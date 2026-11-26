import type { AnchorHTMLAttributes } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> & { href: string };

// Every external link goes through here so rel="noopener noreferrer" is never forgotten.
export default function ExtLink({ href, children, ...rest }: Props) {
  return (
    <a {...rest} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
