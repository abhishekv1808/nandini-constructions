/**
 * Posts from Nandini Constructions' Instagram (@nandiniconstructions, incl. collab reels posted by
 * @shashank_rc). Titles/places were read from each post's cover image, on-screen text and location tag
 * on 2026-10-15; covers saved in public/instagram/<code>.jpg — [CONFIRM] wording with the client. Videos play via Instagram's official embed,
 * loaded only when a visitor taps a card.
 */

export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/nandiniconstructions/';
export const INSTAGRAM_HANDLE = '@nandiniconstructions';

export type MomentKind = 'bhoomi-pooja' | 'gruha-pravesha' | 'construction';

export const MOMENT_KINDS: { value: MomentKind; label: string; description: string }[] = [
  { value: 'bhoomi-pooja', label: 'Bhoomi pooja', description: 'Ground-breaking ceremonies on new sites' },
  {
    value: 'gruha-pravesha',
    label: 'Poojas & openings',
    description: 'Door-frame poojas, homams and opening days',
  },
  { value: 'construction', label: 'On site', description: 'Work in progress' },
];

export type InstagramMoment = {
  /** Instagram shortcode (instagram.com/reel/<code>/). */
  code: string;
  kind: MomentKind;
  title: string;
  place?: string;
};

export const INSTAGRAM_MOMENTS: InstagramMoment[] = [
  {
    code: 'DXZQcDdDo_Z',
    kind: 'bhoomi-pooja',
    title: 'Bhoomi pooja for a new home',
    place: 'SIT Extension, Tumakuru',
  },
  { code: 'DUI1jatEi4D', kind: 'gruha-pravesha', title: 'Pooja and homam ceremony' },
  { code: 'DXVYmCLgSez', kind: 'bhoomi-pooja', title: 'New building started', place: 'Kadaba, Nittur' },
  { code: 'DT7wJEfkmg9', kind: 'gruha-pravesha', title: 'Opening day — entrance decorated with marigolds' },
  { code: 'DaDWWrCujlh', kind: 'construction', title: 'Foundation work', place: 'SIT 12th Cross, Tumakuru' },
  {
    code: 'Dc0CQ1quqHx',
    kind: 'bhoomi-pooja',
    title: 'Coconut-breaking at the site',
    place: 'SIT 12th Cross, Tumakuru',
  },
  { code: 'DXUDXeiDrYE', kind: 'gruha-pravesha', title: 'Main door frame pooja' },
  {
    code: 'Dci4hWgOthf',
    kind: 'construction',
    title: 'Interior finishing — ceiling and TV unit',
    place: 'Tumakuru',
  },
  {
    code: 'DdNsLMoO6OO',
    kind: 'bhoomi-pooja',
    title: 'Bhoomi pooja — new building started',
    place: 'Tumakuru',
  },
  { code: 'DXWBYwsALNr', kind: 'gruha-pravesha', title: 'Pooja at the site' },
  { code: 'DaVK4_yhEW7', kind: 'construction', title: 'Concreting work', place: 'Kadaba, Tumakuru' },
  { code: 'DXi_UjyDgfJ', kind: 'gruha-pravesha', title: 'Home lit up for the celebrations' },
  { code: 'DeJy3o6urpu', kind: 'construction', title: 'Building taking shape' },
];

export const instagramPostUrl = (code: string) => `https://www.instagram.com/reel/${code}/`;
export const instagramEmbedUrl = (code: string) => `https://www.instagram.com/reel/${code}/embed/`;
