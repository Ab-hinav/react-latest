// import { useForm } from "react-hook-form";

import { useState } from "react";
import { PetData } from "../App";
import { useNavigate } from "react-router-dom";

interface PetAdoptionProps {
  setData: React.Dispatch<React.SetStateAction<PetData[]>>;
}

export default function PetAdoption({ setData }: PetAdoptionProps) {


    const [fData, setFData] = useState<PetData>({
      name: "",
      type: "",
      breed: "",
      age: 0,
      yourName: "",
      email: "",
      phone: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const { name, value } = target;

      // Basic validations
      if ((name === "name" || name === "breed" || name === "yourName") && value.trim().length < 3) {
        target.setCustomValidity("Must be at least 3 characters.");
      } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        target.setCustomValidity("Invalid email format.");
      } else if (name === "phone" && !/^\d{10}$/.test(value)) {
        target.setCustomValidity("Phone must be 10 digits.");
      } else {
        target.setCustomValidity("");
      }
      target.reportValidity();
      const parsedValue = name === "age" ? parseInt(value) || 0 : value;
      setFData((prevFormData) => ({ ...prevFormData, [name]: parsedValue }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      alert(`Name: ${fData.name}, Email: ${fData.email}, age: ${fData.age}`);
      setData((prevData: PetData[]) => {
        const updatedData = [...prevData, fData];
        console.log(updatedData);
        return updatedData;
      });

      setFData({
        name: "",
        type: "",
        breed: "",
        age: 0,
        yourName: "",
        email: "",
        phone: "",
      });
    };

    const navigate = useNavigate();


    return (
        <div className="flex-col justify-center items-center space-y-2 bg-gray-100" >
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-center">Pet Adoption Form</h2>

                    <div>
                        <label className="block text-gray-700 mb-1">Pet Name:</label>
                        <input
                            type="text"
                            name="name"
                            required
                            // onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Must be at least 3 characters.")}
                            onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            value={fData.name}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Pet Type:</label>
                        <input
                            type="text"
                            name="type"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            value={fData.type}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Breed:</label>
                        <input
                            type="text"
                            name="breed"
                            required
                            // onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Must be at least 3 characters.")}
                            onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            value={fData.breed}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Age:</label>
                        <input
                            type="text"
                            name="age"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            value={fData.age}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1"> Your Name:</label>
                        <input
                            type="text"
                            name="yourName"
                            required
                            // onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Must be at least 3 characters.")}
                            onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            value={fData.yourName}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            // onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Invalid email format.")}
                            onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            value={fData.email}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            required
                            // onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Phone must be 10 digits.")}
                            onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            value={fData.phone}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
                    />
                </form>


            </div>
            <div className="flex items-center justify-center pb-2 bg-gray-100">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/submit')}> To Pet Table </button>
            </div>
        </div>
    );
}