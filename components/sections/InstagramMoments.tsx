import { InstagramIcon, YouTubeIcon } from '@/components/site/icons';
import { Button } from '@/components/ui/button';
import { getInstagramPosters } from '@/lib/data/instagram-posters';
import { INSTAGRAM_HANDLE, type InstagramMoment } from '@/lib/data/instagram';
import type { SiteConfig } from '@/types/site-config';
import { MomentsGrid } from './MomentsGrid';
import { SectionHeader } from './SectionHeader';

/** Real moments from Nandini Constructions' Instagram: bhoomi poojas, gruha pravesha, site progress. */
export function InstagramMoments({ moments, config }: { moments: InstagramMoment[]; config: SiteConfig }) {
  const posters = getInstagramPosters(moments.map((m) => m.code));
  const instagram = config.social.instagram.status === 'missing' ? null : config.social.instagram.value;
  const youtube = config.social.youtube.status === 'missing' ? null : config.social.youtube.value;

  return (
    <section id="moments" aria-labelledby="moments-title" className="bg-sand py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeader
          id="moments-title"
          eyebrow="From our sites"
          title="Bhoomi poojas, house-warmings and everything in between"
          text="Real moments with our clients in and around Tumakuru — tap any card to watch."
          action={
            <>
              {instagram && (
                <Button asChild variant="secondary" size="sm">
                  <a href={instagram} target="_blank" rel="noopener">
                    <InstagramIcon /> Follow {INSTAGRAM_HANDLE}
                  </a>
                </Button>
              )}
              {youtube && (
                <Button asChild variant="ghost" size="sm">
                  <a href={youtube} target="_blank" rel="noopener">
                    <YouTubeIcon /> YouTube
                  </a>
                </Button>
              )}
            </>
          }
        />
        <MomentsGrid moments={moments} posters={posters} />
      </div>
    </section>
  );
}
