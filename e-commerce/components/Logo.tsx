import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link href="/">
      <h2 className={cn(
        'text-2xl text-dark font-black tracking-wider uppercase', className
      )}>
        Nova
      </h2>
    </Link>
  );
};

export default Logo;
