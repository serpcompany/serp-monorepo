/**
 * Formats a data key string by combining a type and option values.
 * Option values that are falsy (e.g., empty string, 0) are filtered out.
 *
 * @param type - The main type identifier for the data key.
 * @param options - An object containing key-value pairs. The values of these options will be joined to form part of the key.
 * @returns The formatted data key string in the format "type-optionValue1-optionValue2".
 */
export const formatDataKey = (
  type: string,
  options: Record<string, string | number>
) => {
  const formattedOptions = Object.values(options)
    .filter((value) => Boolean(value))
    .join('-');

  return `${type}-${formattedOptions}`;
};
