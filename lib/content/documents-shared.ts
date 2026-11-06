/**
 * Bundled prospectus, used until one is uploaded.
 *
 * Deliberately alone in a neutral module. It used to sit beside
 * getBrochureUrl, which reaches for the Supabase client — so the four client
 * components that need this constant were dragging a server module into the
 * client graph, and /admin died rendering next/link with React's dispatcher
 * null. Same trap as sectionDomId and resolveAssetUrl.
 */
export const DEFAULT_BROCHURE = 'https://files.mlrit.ac.in/uploads/Brochure26.pdf';
