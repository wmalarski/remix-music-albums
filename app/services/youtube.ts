const buildLink = (title: string, name: string): string => {
  const value = `${title ?? ""} ${name ?? ""}`.replace(" ", "+");
  const params = new URLSearchParams({ search_query: value });
  return `https://www.youtube.com/results?${params}`;
};

export const redirectToYt = (title: string, name: string): void => {
  if (typeof window === "undefined") return;
  window.open(buildLink(title, name), "_blank");
};
