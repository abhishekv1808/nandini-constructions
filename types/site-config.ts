/**
 * Business facts are never hard-coded as truth (CLAUDE.md §1.1, §14). Every field says whether
 * it's confirmed by the client, tentative (from public listings, still [CONFIRM]) or missing.
 */
export type Field<T> =
  | { status: 'confirmed'; value: T }
  | { status: 'tentative'; value: T; label: string }
  | { status: 'missing'; value: null; label: string };

export type PostalAddress = {
  street: string;
  locality: string;
  city: string;
  postalCode: string;
  region: string;
};

export type OfficeHours = { days: string; hours: string }[];

export type SiteStats = {
  projectsDelivered: Field<number>;
  sqftBuilt: Field<number>;
  qualityChecksPerStage: Field<number>;
  yearsExperience: Field<number>;
};

export type SiteConfig = {
  source: 'supabase' | 'fallback';
  companyName: string;
  legalName: Field<string>;
  founder: Field<string>;
  established: Field<number>;
  phone: Field<string>;
  whatsapp: Field<string>;
  email: Field<string>;
  address: Field<PostalAddress>;
  mapUrl: Field<string>;
  gbpUrl: Field<string>;
  googleRating: Field<number>;
  googleReviewCount: Field<number>;
  gstin: Field<string>;
  showGstin: boolean;
  officeHours: Field<OfficeHours>;
  social: {
    instagram: Field<string>;
    youtube: Field<string>;
    facebook: Field<string>;
  };
  stats: SiteStats;
};

/**
 * Shape of the `site_settings` row (CLAUDE.md §7.1). Hand-written until Phase 2 generates
 * types/supabase.ts. `show_gstin`, `founder` and `established_year` are proposed additions for
 * the Phase 2 migration.
 */
export type SiteSettingsRow = {
  company_name: string | null;
  legal_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: PostalAddress | null;
  map_embed_url: string | null;
  gbp_url: string | null;
  google_rating: number | null;
  google_review_count: number | null;
  gstin: string | null;
  show_gstin?: boolean | null;
  founder?: string | null;
  established_year?: number | null;
  social_links: { instagram?: string; youtube?: string; facebook?: string } | null;
  office_hours: OfficeHours | null;
  stats: {
    projects_delivered?: number;
    sqft_built?: number;
    quality_checks_per_stage?: number;
    years_experience?: number;
  } | null;
};
