import axios from "axios";
import { atom, selectorFamily } from "recoil";

export type Course = {
    _id: string;
    title: string,
    description: string,
    status: number,
    imageUrl: string,
    creatorId?: string,
    price: number,
}

export const userState = atom({
    key: "userState",
    default: {
        username: "",
        password: "",
        token: "",
        isAdmin: false
    }
})


export const currCourseListState = atom({
    key: "currCourseListState",
    default: [] as Course[]
})


export const courseDetailsQuery = selectorFamily({
    key: "courseDetails",
    get: (id: string) => async ({ get }) => {

        const userToken = get(userState).token;
        try {

            const response = await axios.get(`http://localhost:3000/api/user/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            console.log(response.data);
            return response.data as Course;
        } catch (error) {
            console.error("Error fetching course details:", error);
            throw error;
        }
    }
});



// export const setTokenState = selector({
//     key: "setTokenState",
//     get: ({ get }) => {
//         const token = get(userState).token;
//         return token;
//     }
// })