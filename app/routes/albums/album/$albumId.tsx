import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { TrashIcon } from "@radix-ui/react-icons";
import { ReactElement, useState } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
} from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { frontCoverUrl } from "~/api/coverArt";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { AlbumWithArtistAndReviewsFragment } from "~/api/types.server";
import {
  DialogContent,
  DialogHeader,
  DialogRoot,
  ErrorsList,
  Flex,
  Heading,
  IconButton,
  StyledLink,
  Tabs,
  TabsList,
  TabsTrigger,
} from "~/components";
import { AlbumRoot } from "~/molecules/albums";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ params, request }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.DeleteAlbum({ id: Number(params.albumId) });

  const artist = result.data?.deleteAlbumByPk?.artist;
  if (!artist || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.artist(artist));
};

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!isNumber(params.albumId))
    throw new Response("Album Not Found", { status: 404 });

  const user = await authenticator.isAuthenticated(request);

  const albumId = Number(params.albumId);
  const [result] = await Promise.all([
    graphqlSdk.SelectAlbum({ id: albumId }),
    user
      ? graphqlSdk.InsertVisit({
          visit: { album: albumId, profile: user.profileId },
        })
      : Promise.resolve(true),
  ]);

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  const albumFragment = result.data?.albumByPk;
  if (!albumFragment) throw new Response("Album Not Found", { status: 404 });

  return json<AlbumWithArtistAndReviewsFragment>(albumFragment);
};

const Album = (): ReactElement => {
  const album = useLoaderData<AlbumWithArtistAndReviewsFragment>();
  const action = useActionData<FetcherActionData>();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const handleCloseClick = () => setIsOpen(false);
  const handleOpenChange = () => navigate(routes.albums);
  const handleTabChange = (value: string) => navigate(value);

  return (
    <AlbumRoot album={album}>
      <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <Flex direction="column">
            <DialogHeader onClose={handleCloseClick}>
              <Flex direction="row" alignItems="center" gap="1">
                <Heading size="small">{album.title}</Heading>
                <StyledLink to={routes.artist(album.artistByArtist.id)}>
                  <Heading size="small2">{album.artistByArtist.name}</Heading>
                </StyledLink>
                <Form method="delete">
                  <IconButton type="submit">
                    <AccessibleIcon label="Delete album">
                      <TrashIcon />
                    </AccessibleIcon>
                  </IconButton>
                </Form>
              </Flex>
            </DialogHeader>
            <Flex direction="row" gap={2}>
              <Flex direction="column">
                <img src={frontCoverUrl({ mBid: album.sid })} alt="" />
              </Flex>
              <Tabs value={location.pathname} onValueChange={handleTabChange}>
                <TabsList aria-label="Manage your account">
                  <TabsTrigger value={routes.album(album.id)}>
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value={routes.newReview(album.id)}>
                    New Review
                  </TabsTrigger>
                  <TabsTrigger value={routes.editAlbum(album.id)}>
                    Edit Album
                  </TabsTrigger>
                </TabsList>
                <Outlet />
              </Tabs>
            </Flex>
          </Flex>
        </DialogContent>
      </DialogRoot>
      <ErrorsList errors={action?.fetcherErrors} />
    </AlbumRoot>
  );
};

export default Album;
