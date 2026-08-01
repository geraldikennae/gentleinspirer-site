/** Replaces {{key}} placeholders with the given values. Unknown placeholders are left as-is. */
export function renderTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => (key in vars ? vars[key] : match));
}

/** Splits an admin-edited body field into paragraphs on blank lines, dropping any that end up empty (e.g. a template's {{dek}} placeholder resolving to ""). */
export function splitParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
