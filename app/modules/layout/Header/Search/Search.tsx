import { ReactElement } from "react";
import { useFetcher, useNavigate } from "remix";
import { SearchQuery } from "~/services/types.server";
import { useCallbackDebounce } from "~/utils/debounce";
import { routes } from "~/utils/routes";
import { SearchAutocomplete } from "./SearchAutocomplete/SearchAutocomplete";

export const Search = (): ReactElement => {
  const fetcher = useFetcher<SearchQuery>();
  const navigate = useNavigate();

  const handleInputValueChange = (inputValue?: string) => {
    console.log({ inputValue });
    fetcher.submit(new URLSearchParams({ query: `%${inputValue}%` }), {
      method: "get",
      action: routes.search,
    });
  };

  const handleSelectedAlbumChange = (id: number) => {
    navigate(routes.album(id));
  };

  const handleSelectedArtistChange = (id: number) => {
    navigate(routes.artist(id));
  };

  const debouncedHandleChange = useCallbackDebounce(
    handleInputValueChange,
    1000
  );

  return (
    <SearchAutocomplete
      onInputValueChange={debouncedHandleChange}
      onSelectedAlbumChange={handleSelectedAlbumChange}
      onSelectedArtistChange={handleSelectedArtistChange}
      data={fetcher.data}
    />
  );
};
