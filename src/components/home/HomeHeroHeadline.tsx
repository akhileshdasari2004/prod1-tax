import { BlurFade } from '../ui/blur-fade';

type HomeHeroHeadlineProps = {
  eyebrow: string;
  headline: string;
};

export default function HomeHeroHeadline({ eyebrow, headline }: HomeHeroHeadlineProps) {
  return (
    <>
      <BlurFade delay={0.25} inView>
        <p className="text-eyebrow">{eyebrow}</p>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <h1 id="home-hero-heading" className="text-display mt-4 text-balance">
          {headline}
        </h1>
      </BlurFade>
    </>
  );
}
