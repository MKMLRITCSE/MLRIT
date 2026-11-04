import type { Field } from 'payload';

import {
  fieldType,
  galleryAccept,
  isMediaColumn,
  repeaterItemFields,
  type FieldConfig,
  type GalleryItemField,
  type RepeaterItemField,
} from '@/lib/content/sections';
import { transientMediaMessage } from '@/lib/content/validate';

/**
 * Translate one CONTENT_SECTIONS field into its Payload equivalent.
 *
 * CONTENT_SECTIONS stays the single source of truth: sections are not
 * hand-written as Payload globals, they are derived here. Adding a field to a
 * section therefore still only means editing sections.ts, exactly as before.
 *
 * Media values keep their existing contract — a string the components pass to
 * resolveAssetUrl() — rather than becoming upload relationships. That resolver
 * already passes absolute URLs and rooted paths straight through, so every
 * value currently stored in content_blocks migrates byte-for-byte and renders
 * identically. The Media collection exists so uploads have somewhere to land;
 * the picker writes the resulting URL into these fields.
 */

/** The fixed metadata inputs a gallery item may carry. */
const GALLERY_ITEM_FIELD: Record<GalleryItemField, Field> = {
  name: { name: 'name', type: 'text', label: 'Name' },
  title: { name: 'title', type: 'text', label: 'Title' },
  linkUrl: { name: 'linkUrl', type: 'text', label: 'Link URL' },
  active: { name: 'active', type: 'checkbox', label: 'Active', defaultValue: true },
  startDate: { name: 'startDate', type: 'text', label: 'Start date' },
  endDate: { name: 'endDate', type: 'text', label: 'End date' },
};

/** A media slot: a URL or storage key, chosen with the Media browser. */
const mediaField = (
  name: string,
  label: string,
  accept: 'image' | 'video' | 'document'
): Field => ({
  name,
  type: 'text',
  label,
  admin: {
    description:
      `${accept === 'document' ? 'PDF' : accept} — upload under Administration → Media, copy the file's URL ` +
      '(it starts with /media/) and paste it here. A path on the site (/examinations/…) or a link from the S3 bucket also works.',
  },
  // Rejects blob:/data: — a handle into one browser document that renders as
  // a broken asset once saved. One such URL reached the live homepage under
  // the previous CMS; media fields are still plain text here, so the guard
  // still earns its place.
  validate: transientMediaMessage,
  custom: { accept },
});

const repeaterColumn = (column: RepeaterItemField): Field => {
  if (isMediaColumn(column)) {
    return mediaField(column.name, column.label, column.type as 'image' | 'video' | 'document');
  }
  if (column.type === 'number') {
    return { name: column.name, type: 'number', label: column.label };
  }
  if (column.type === 'select') {
    return {
      name: column.name,
      type: 'select',
      label: column.label,
      options: [...(column.options ?? [])],
    };
  }
  return { name: column.name, type: 'text', label: column.label };
};

/**
 * `id` on gallery and repeater items is content, not a database key: it is
 * minted when a row is added and must survive reordering, because consumers
 * use it as a React key and defaultItems match on it. Payload arrays have
 * their own `id`, so the original is carried in `itemId` and restored to `id`
 * by the read layer.
 */
const ITEM_ID: Field = {
  name: 'itemId',
  type: 'text',
  label: 'Item ID',
  admin: {
    readOnly: true,
    description: 'Stable identifier. Generated on save; do not edit.',
    position: 'sidebar',
  },
};

/**
 * Rows a never-saved section opens with. CONTENT_SECTIONS declares these so the
 * editor shows the live hardcoded set rather than an empty list; Payload wants
 * them as the array's defaultValue, with the content `id` moved to `itemId`.
 */
const defaultRows = (field: FieldConfig): Record<string, unknown>[] | undefined => {
  const items = field.defaultItems;
  if (!items?.length) return undefined;
  return items.map((item) => {
    const { id, ...rest } = item as Record<string, unknown>;
    return { ...rest, itemId: typeof id === 'string' ? id : undefined };
  });
};

export function toPayloadField(field: FieldConfig): Field {
  const type = fieldType(field);
  const common = { name: field.name, label: field.label };

  switch (type) {
    case 'multiline':
      return { ...common, type: 'textarea', defaultValue: field.defaultValue };

    case 'image':
    case 'video':
    case 'document':
      return mediaField(field.name, field.label, type);

    case 'gallery': {
      const accept = galleryAccept(field);
      // A gallery's itemFields comes in two forms. Most name metadata from the
      // fixed GalleryItemField set; four (success-stories cards, testimonials
      // people, events slides, footer logos) instead declare columns inline the
      // way a repeater does. Handling only the first form silently produced an
      // array of bare images, and the migration's round-trip check caught it:
      // every season/name/detail on the success stories was being dropped.
      const columns = (field.itemFields ?? []).map((column) =>
        typeof column === 'string'
          ? GALLERY_ITEM_FIELD[column]
          : repeaterColumn(column as RepeaterItemField)
      );
      return {
        ...common,
        type: 'array',
        labels: { singular: 'Item', plural: 'Items' },
        defaultValue: defaultRows(field),
        fields: [
          mediaField('key', accept === 'video' ? 'Video' : 'Image', accept),
          ...columns,
          ITEM_ID,
        ],
      };
    }

    case 'repeater':
      return {
        ...common,
        type: 'array',
        labels: { singular: 'Row', plural: 'Rows' },
        defaultValue: defaultRows(field),
        fields: [...repeaterItemFields(field).map(repeaterColumn), ITEM_ID],
      };

    case 'text':
    default:
      return { ...common, type: 'text', defaultValue: field.defaultValue };
  }
}
