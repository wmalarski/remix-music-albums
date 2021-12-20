import * as Portal from "@radix-ui/react-portal";
import { ReactElement } from "react";
import { FetcherError } from "~/api/fetcher.server";
import * as Styles from "./ErrorsList.styles";

type Props = {
  errors?: FetcherError[];
};

export const ErrorsList = ({ errors }: Props): ReactElement | null => {
  return errors ? (
    <Portal.Root>
      <Styles.Root direction="column">
        {errors?.map((error) => (
          <p key={error.message}>{error.message}</p>
        ))}
      </Styles.Root>
    </Portal.Root>
  ) : null;
};
