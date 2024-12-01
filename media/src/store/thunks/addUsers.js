import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";


const addUser = createAsyncThunk("users/add", async () => {
    const user = { name: faker.name.firstName() }
    const response = await axios.post("http://localhost:3005/users", user);
    // await pause(1000);
    return response.data;
});

export { addUser };