import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                providesTags: (result, error, arg) => {
                    const tags = result.map((album) => ({ type: 'Albums', id: album.id }));
                    tags.push({ type: 'UsersAlbums', id: arg.id });
                    return tags;
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    };
                },
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, arg) => [{ type: 'UsersAlbums', id: arg.id }],
                query: (user) => {
                    const album = { userId: user.id };
                    album.id = faker.datatype.uuid();
                    album.name = faker.commerce.productName();
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: album,
                    };
                },
            }),
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    console.log(result, error, arg);
                    return [{ type: 'Albums', id: arg.id }]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    };
                },
            }),
        };
    },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };