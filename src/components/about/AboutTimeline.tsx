import { aboutTimelineItems } from '../../content/about-timeline';
import { Timeline } from '../ui/modern-timeline';

export default function AboutTimeline() {
  return <Timeline items={aboutTimelineItems} className="mt-4" />;
}
