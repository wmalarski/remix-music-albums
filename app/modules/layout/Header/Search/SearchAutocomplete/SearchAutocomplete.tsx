import { useCombobox } from "downshift";
import { ReactElement } from "react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteTrigger,
  IconButton,
  TextInput,
} from "~/components";
import { SearchQuery } from "~/services/types.server";

type Props = {
  data?: SearchQuery;
  onInputValueChange: (inputValue?: string) => void;
  onSelectedAlbumChange: (id: number) => void;
  onSelectedArtistChange: (id: number) => void;
};

export const SearchAutocomplete = ({
  data,
  onInputValueChange,
  onSelectedAlbumChange,
  onSelectedArtistChange,
}: Props): ReactElement => {
  const artistShift = data?.album.length ?? 0;
  const inputItems = [...(data?.album ?? []), ...(data?.artist ?? [])];

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
    onInputValueChange: ({ inputValue }) => onInputValueChange(inputValue),
    itemToString: (item) => {
      switch (item?.__typename) {
        case "album":
          return `${item.title} - ${item.artistByArtist.name}`;
        case "artist":
          return item.name;
        default:
          return "";
      }
    },
    onSelectedItemChange: (changes) => {
      const item = changes.selectedItem;
      if (!item) return;

      switch (item.__typename) {
        case "album":
          return onSelectedAlbumChange(item.id);
        case "artist": {
          return onSelectedArtistChange(item.id);
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
            {data?.album.map((item, index) => (
              <AutocompleteItem
                active={highlightedIndex === index}
                key={`album-${item.id}`}
                {...getItemProps({ item, index })}
              >
                {`${item.title} - ${item.artistByArtist.name}`}
              </AutocompleteItem>
            ))}
            <AutocompleteLabel>Artists</AutocompleteLabel>
            {data?.artist.map((item, index) => (
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
