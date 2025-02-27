// Только необходимые утилиты без Tailwind
export const encodeBase64 = (str: string): string =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );

/**
 * Утилита для объединения имен классов
 */
export function mergeClassNames(
  ...classNames: (string | undefined | false | null)[]
): string {
  return classNames.filter(Boolean).join(' ');
}

/**
 * Альтернатива функции cn из Tailwind (clsx + twMerge)
 */
export const cn = mergeClassNames;
