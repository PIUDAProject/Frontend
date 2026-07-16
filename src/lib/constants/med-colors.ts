import type { MedColor } from '@/lib/data/types';

export const MED_COLOR_CLASSES: Record<
  MedColor,
  { iconBg: string; iconColor: string; chipBg: string; chipText: string }
> = {
  blue: {
    iconBg: 'bg-med-blue-bg',
    iconColor: 'text-med-blue',
    chipBg: 'bg-med-blue-bg',
    chipText: 'text-med-blue',
  },
  purple: {
    iconBg: 'bg-med-purple-bg',
    iconColor: 'text-med-purple',
    chipBg: 'bg-med-purple-bg',
    chipText: 'text-med-purple',
  },
  orange: {
    iconBg: 'bg-med-orange-bg',
    iconColor: 'text-med-orange',
    chipBg: 'bg-med-orange-bg',
    chipText: 'text-med-orange',
  },
};
