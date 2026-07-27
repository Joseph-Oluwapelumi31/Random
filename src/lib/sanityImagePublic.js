/**
 * Image URL builder safe for client components — uses only NEXT_PUBLIC_* ids (no API token).
 */
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'es4fl0a9';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const publicClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(publicClient);

export function urlForImagePublic(source) {
  if (!source || typeof source !== 'object') return null;
  try {
    return builder.image(source);
  } catch {
    return null;
  }
}
