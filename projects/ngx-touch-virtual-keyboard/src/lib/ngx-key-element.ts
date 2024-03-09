export interface INGXKeyElement {
  p: string;
  s?: string;
}

export function k(a: string, b?: string): INGXKeyElement {
  return { p: a, s: b };
}
