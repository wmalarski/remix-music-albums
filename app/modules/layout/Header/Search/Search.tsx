import { ReactElement } from "react";
import { useFetcher, useNavigate } from "remix";
import { useDebounce } from "~/hooks/useDebounce";
import { SearchQuery } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { SearchAutocomplete } from "./SearchAutocomplete/SearchAutocomplete";

export const Search = (): ReactElement => {
  const fetcher = useFetcher<SearchQuery>();
  const navigate = useNavigate();

  const handleSelectedAlbumChange = (id: number) => {
    navigate(routes.album(id));
  };

  const handleSelectedArtistChange = (id: number) => {
    navigate(routes.artist(id));
  };

  const handleInputValueChange = useDebounce((inputValue?: string) => {
    console.log({ inputValue });
    fetcher.submit(new URLSearchParams({ query: `%${inputValue}%` }), {
      method: "get",
      action: routes.search,
    });
  }, 500);

  return (
    <SearchAutocomplete
      onInputValueChange={handleInputValueChange}
      onSelectedAlbumChange={handleSelectedAlbumChange}
      onSelectedArtistChange={handleSelectedArtistChange}
      data={fetcher.data}
    />
  );
};
