const apiEndpoint = "https://coverartarchive.org";

type FrontCoverUrlArgs = {
  mBid: string;
};

export const frontCoverUrl = ({ mBid }: FrontCoverUrlArgs): string =>
  `${apiEndpoint}/release/${mBid}/front-250`;
