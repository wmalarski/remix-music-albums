import { useEffect, useState } from "react";
import { config } from "~/styles/stitches.config";

type MediaKey = keyof typeof config["media"];

export const useMediaQuery = (key: MediaKey): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = config.media[key];
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [matches, key]);

  return matches;
};
