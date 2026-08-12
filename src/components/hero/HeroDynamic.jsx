
import Hero3D from '@/components/hero/Hero3D';

/** Inline hero (no dynamic split) so a failed lazy chunk cannot blank the fold. */
export default function HeroDynamic({ heroCopy = null }) {
  return <Hero3D heroCopy={heroCopy} />;
}
