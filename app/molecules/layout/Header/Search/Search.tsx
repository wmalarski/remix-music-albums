import { useCombobox } from "downshift";
import { ReactElement } from "react";
import { useFetcher, useNavigate } from "remix";
import { SearchQuery } from "~/api/types.server";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteTrigger,
  IconButton,
  TextInput,
} from "~/components";
import { routes } from "~/utils/routes";

export const Search = (): ReactElement => {
  const fetcher = useFetcher<SearchQuery>();
  const navigate = useNavigate();

  const artistShift = fetcher.data?.album.length ?? 0;
  const inputItems = [
    ...(fetcher.data?.album ?? []),
    ...(fetcher.data?.artist ?? []),
  ];

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      fetcher.submit(new URLSearchParams({ query: `%${inputValue}%` }), {
        method: "get",
        action: routes.search,
      });
    },
    onSelectedItemChange: (changes) => {
      const item = changes.selectedItem;
      if (!item) return;

      switch (item.__typename) {
        case "album": {
          navigate(routes.album(item.id));
          return;
        }
        case "artist": {
          navigate(routes.artist(item.id));
          return;
        }
      }
    },
  });

  return (
    <Autocomplete>
      <AutocompleteTrigger {...getComboboxProps()}>
        <TextInput {...getInputProps()} />
        <IconButton
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </IconButton>
      </AutocompleteTrigger>
      <AutocompleteContent {...getMenuProps()}>
        {isOpen && (
          <>
            <AutocompleteLabel>Albums</AutocompleteLabel>
            {fetcher.data?.album.map((item, index) => (
              <AutocompleteItem
                active={highlightedIndex === index}
                key={`album-${item.id}`}
                {...getItemProps({ item, index })}
              >
                {`${item.title} - ${item.artistByArtist.name}`}
              </AutocompleteItem>
            ))}
            <AutocompleteLabel>Artists</AutocompleteLabel>
            {fetcher.data?.artist.map((item, index) => (
              <AutocompleteItem
                active={highlightedIndex === index + artistShift}
                key={`artist-${item.id}`}
                {...getItemProps({ item, index: index + artistShift })}
              >
                {item.name}
              </AutocompleteItem>
            ))}
          </>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
};
