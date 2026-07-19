import { Button } from '@/components/ui/button';
import type { ChatDrugCardAction } from '@/lib/data/types';
import Link from 'next/link';

interface InlineCtaButtonProps {
  action: ChatDrugCardAction;
  // 카드당 주 CTA 1개(primary) + 보조 CTA 1개(secondary)만 허용
  variant: 'primary' | 'secondary';
}

export function InlineCtaButton({ action, variant }: InlineCtaButtonProps) {
  return (
    <Button asChild variant={variant === 'primary' ? 'default' : 'outline'} size="dialog">
      <Link href={action.href}>{action.label}</Link>
    </Button>
  );
}
