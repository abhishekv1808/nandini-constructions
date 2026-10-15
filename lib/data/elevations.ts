import type { StaticImageData } from 'next/image';
import imgA from '@/public/elevation_images/imgi_16_835120250_18466077913184882_3947348094003321409_n.jpg';
import imgB from '@/public/elevation_images/nandiniconstructions_1633402720_2677498538839479669_49712033359.webp';
import imgC from '@/public/elevation_images/nandiniconstructions_1644838601_2773429664015162363_49712033359.webp';
import imgD from '@/public/elevation_images/nandiniconstructions_1644838633_2773429932853230706_49712033359.webp';
import imgE from '@/public/elevation_images/nandiniconstructions_1663550322_2930394954039824402_49712033359.webp';
import imgF from '@/public/elevation_images/nandiniconstructions_1686834873_3125719927253158595_49712033359.jpg';
import imgG from '@/public/elevation_images/nandiniconstructions_1686834873_3125719927253193597_49712033359.jpg';
import imgH from '@/public/elevation_images/nandiniconstructions_1693303884_3179985920452014708_49712033359.jpg';
import imgI from '@/public/elevation_images/nandiniconstructions_1705371358_3281215235066975876_49712033359.jpg';
import imgJ from '@/public/elevation_images/nandiniconstructions_1705371358_3281215235067157274_49712033359.jpg';
import imgK from '@/public/elevation_images/nandiniconstructions_1705371358_3281215235092145975_49712033359.jpg';

export type Elevation = {
  key: string;
  /** Static import → intrinsic size + blur placeholder generated at build time. */
  image: StaticImageData;
  alt: string;
  /**
   * Fraction of the image height hidden at the bottom. Used to keep the "Proposed residence for
   * <client name>" banner baked into some renders off screen (owner consent for names is
   * [CONFIRM], CLAUDE.md §15 Q8).
   */
  cropBottom?: number;
};

/**
 * Client-supplied 3D front-elevation renders (public/elevation_images). Ordered so views of the
 * same house are not adjacent. Alt text describes the design only — never client names.
 */
export const ELEVATIONS: Elevation[] = [
  {
    key: 'contemporary-stone-jaali',
    image: imgA,
    alt: 'Three-storey contemporary home elevation with marble-look cladding, glass balconies, wooden fins and a geometric jaali screen',
  },
  {
    key: 'stone-red-jaali',
    image: imgH,
    alt: 'Three-storey elevation with stacked-stone cladding, wood-finish panels, a red jaali screen and parking at ground level',
  },
  {
    key: 'corner-wood-balcony',
    image: imgI,
    alt: 'Corner home elevation with a wood-clad double-height balcony, rooftop garden railing and a long side façade',
  },
  {
    key: 'narrow-plot-angled',
    image: imgF,
    alt: 'Narrow-plot three-storey home with glass balconies, stone-clad first floor and a slatted staircase screen, angled view',
  },
  {
    key: 'grey-white-porch',
    image: imgB,
    alt: 'Two-storey modern home elevation with a grey and white façade, cantilevered balcony with wood soffit and covered car porch',
  },
  {
    key: 'corner-pergola-east-north',
    image: imgC,
    alt: 'Corner residence elevation, east and north views, with wooden pergolas, glass balconies and a brown-and-cream façade',
    cropBottom: 0.1,
  },
  {
    key: 'framed-balcony-terracotta',
    image: imgE,
    alt: 'Two-storey home elevation with a framed front balcony, terracotta accent panels and ground-floor car parking',
    cropBottom: 0.06,
  },
  {
    key: 'corner-wood-balcony-front',
    image: imgJ,
    alt: 'Front view of a home with a wood-clad balcony, black frame façade and slatted compound gate',
  },
  {
    key: 'narrow-plot-front',
    image: imgG,
    alt: 'Front view of a narrow-plot three-storey home with glass balconies and a stone-clad façade',
  },
  {
    key: 'corner-pergola-west-south',
    image: imgD,
    alt: 'Corner residence elevation, west and south views, with a full-height wood-clad tower and jaali panel',
    cropBottom: 0.1,
  },
  {
    key: 'side-facade-detail',
    image: imgK,
    alt: 'Side façade detail with black-framed windows, hanging planters and a terrace railing',
  },
];
