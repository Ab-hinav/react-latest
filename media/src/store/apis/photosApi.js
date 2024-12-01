import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, arg) => {
                    const tags = result.map((photo) => ({ type: 'Photos', id: photo.id }));
                    tags.push({ type: 'UsersPhotos', id: arg.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id,
                        },
                        method: 'GET',
                    };
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, arg) => [{ type: 'UsersPhotos', id: arg.id }],
                query: (album) => {
                    const photo = { albumId: album.id };
                    photo.id = faker.datatype.uuid();
                    photo.data = faker.image.abstract(150, 150, true);
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: photo,
                    };
                },
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    console.log(result, error, arg);
                    return [{ type: 'Photos', id: arg.id }]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE',
                    };
                },
            }),
        }
    }
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };