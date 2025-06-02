
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { PetData } from "../App";

interface SubmittedFormProps {
  data: PetData[];
}

export default function SubmittedForm({ data }: SubmittedFormProps) {

    const navigate = useNavigate();


    const tableHeadings =['PetName','PetType','Breed','Age','AdopterName','Email','Phone'];

    console.log(data);

    return <div>
        <Table data={data} headings={tableHeadings}></Table>
        <div className="items-center justify-center flex pt-2">
        <button className="bg-blue-500 text-amber-50 px-3 py-1 rounded-xl hover:bg-blue-700"  onClick={()=>navigate('/')}>Back</button>
        </div>
    </div>

}