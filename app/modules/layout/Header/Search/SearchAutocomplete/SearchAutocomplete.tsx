import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UseComboboxProps } from "downshift";
import { ReactElement } from "react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteMenu,
  AutocompleteToggleButton,
  AutocompleteTrigger,
  Divider,
} from "~/components";
import { SearchQuery } from "~/services/types.server";

type Props = {
  data?: SearchQuery;
  onInputValueChange: (inputValue?: string) => void;
  onSelectedAlbumChange: (id: number) => void;
  onSelectedArtistChange: (id: number) => void;
};

type SearchItem = SearchQuery["album"][0] | SearchQuery["artist"][0];

export const SearchAutocomplete = ({
  data,
  onInputValueChange,
  onSelectedAlbumChange,
  onSelectedArtistChange,
}: Props): ReactElement => {
  const artistShift = data?.album.length ?? 0;
  const inputItems = [...(data?.album ?? []), ...(data?.artist ?? [])];

  const options: UseComboboxProps<SearchItem> = {
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
  };

  return (
    <Autocomplete<SearchItem> options={options}>
      <AutocompleteContent direction="column">
        <AutocompleteTrigger aria-label="Search form">
          <VisuallyHidden>
            <AutocompleteLabel>Search</AutocompleteLabel>
          </VisuallyHidden>
          <AutocompleteInput id="search" />
          <AutocompleteToggleButton aria-label="toggle autocomplete">
            <AccessibleIcon label="Arrow down">
              <ArrowDownIcon />
            </AccessibleIcon>
          </AutocompleteToggleButton>
        </AutocompleteTrigger>
        <AutocompleteMenu>
          <AutocompleteLabel>Albums</AutocompleteLabel>
          {data?.album.map((item, index) => (
            <AutocompleteItem
              key={`album-${item.id}`}
              item={item}
              index={index}
            >
              {`${item.title} - ${item.artistByArtist.name}`}
            </AutocompleteItem>
          ))}
          <Divider />
          <AutocompleteLabel>Artists</AutocompleteLabel>
          {data?.artist.map((item, index) => (
            <AutocompleteItem
              key={`artist-${item.id}`}
              item={item}
              index={index + artistShift}
            >
              {item.name}
            </AutocompleteItem>
          ))}
        </AutocompleteMenu>
      </AutocompleteContent>
    </Autocomplete>
  );
};
