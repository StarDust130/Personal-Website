export interface SearchablePost {
  title: string;
  description: string;
  tags: string[];
  searchText: string;
  searchTerms: string[];
}

export function normalizeQuery(query: string): string {
  return query.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

export function getQueryTerms(query: string): string[] {
  const normalized = normalizeQuery(query);
  if (!normalized) return [];

  return normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

export function matchesQuery(
  post: SearchablePost,
  query: string
): boolean {
  const terms = getQueryTerms(query);
  if (terms.length === 0) return true;

  const metadata = post.searchText.toLowerCase();

  return terms.every((term) => {
    if (metadata.includes(term)) return true;

    if (term.length <= 2) {
      return post.searchTerms.some((candidate) => candidate.startsWith(term));
    }

    return post.searchTerms.some((candidate) => candidate.includes(term));
  });
}

export function filterPosts<T extends SearchablePost>(
  posts: readonly T[],
  query: string
): T[] {
  return posts.filter((post) => matchesQuery(post, query));
}
