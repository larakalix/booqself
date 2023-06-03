export const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

export const kFormatter = (number: number) =>
    `${Intl.NumberFormat("en", { notation: "compact" }).format(number)}`;
