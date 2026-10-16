import {
  Building2Icon,
  DraftingCompassIcon,
  HammerIcon,
  HomeIcon,
  SofaIcon,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceSlug } from '@/lib/data/services';

export const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
  'residential-construction': HomeIcon,
  'commercial-construction': Building2Icon,
  'interior-design': SofaIcon,
  'renovation-and-extension': HammerIcon,
  'architectural-design': DraftingCompassIcon,
};
