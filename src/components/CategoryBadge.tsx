import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/categories';

interface CategoryBadgeProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const meta = getCategoryBySlug(category);

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  }[size];

  return (
    <Link
      href={`/category/${meta.slug}`}
      className={`inline-flex items-center font-medium rounded-full border transition-all duration-200 hover:scale-105 ${meta.color} ${sizeClasses}`}
    >
      {meta.name}
    </Link>
  );
}
