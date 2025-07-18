/**
 * Capitalizes the first letter of a string and makes the rest lowercase
 * @param str - The input string to transform
 * @returns The transformed string
 * 
 * @example
 * capitalizeFirstLetter('hELLO'); // Returns 'Hello'
 * capitalizeFirstLetter('world'); // Returns 'World'
 */
export const capitalizeFirstLetter = (str: string): string => {
    if (!str || typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The input string to transform
 * @returns The transformed string
 * 
 * @example
 * capitalizeWords('hello world'); // Returns 'Hello World'
 */
export const capitalizeWords = (str: string): string => {
    if (!str || typeof str !== 'string') return str;
    return str.split(' ').map(capitalizeFirstLetter).join(' ');
};

/**
 * String utility object with common string operations
 */
export const StringUtils = {
    capitalizeFirstLetter,
    capitalizeWords,

    /**
     * Converts a string to camelCase
     * @param str - The input string to transform
     * @returns The transformed string
     * 
     * @example
     * StringUtils.toCamelCase('hello-world'); // Returns 'helloWorld'
     */
    toCamelCase: (str: string): string => {
        if (!str || typeof str !== 'string') return str;
        return str
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
            .replace(/^[A-Z]/, first => first.toLowerCase());
    },

    /**
     * Converts a string to kebab-case
     * @param str - The input string to transform
     * @returns The transformed string
     * 
     * @example
     * StringUtils.toKebabCase('HelloWorld'); // Returns 'hello-world'
     */
    toKebabCase: (str: string): string => {
        if (!str || typeof str !== 'string') return str;
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    },

    /**
     * Truncates a string with an ellipsis if it exceeds the max length
     * @param str - The input string
     * @param maxLength - Maximum length before truncation
     * @returns The truncated string
     * 
     * @example
     * StringUtils.truncate('This is a long string', 10); // Returns 'This is a...'
     */
    truncate: (str: string, maxLength: number): string => {
        if (!str || typeof str !== 'string') return str;
        return str.length > maxLength
            ? `${str.substring(0, maxLength)}...`
            : str;
    }
};