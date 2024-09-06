import SortableTable from "../components/SortableTable";
import Table from "../components/Table";

export default function TablePage() {

    const data = [
        { name: 'Orange', color: 'bg-orange-500', score: 5 },
        { name: 'Apple', color: 'bg-red-500', score: 3 },
        { name: 'Banana', color: 'bg-yellow-500', score: 2 },
        { name: 'Lime', color: 'bg-green-500', score: 1 },
        { name: 'Grape', color: 'bg-purple-500', score: 4 },
    ];

    const keyFn = (fruit) => fruit.name;
    const config = [
        {
            label: 'Fruits',
            render: (fruit) => fruit.name,
            sortValue: (fruit) => fruit.name,
        },
        {
            label: 'Color',
            render: (fruit) => <div className={`p-3 m-2 ${fruit.color}`}></div>,
        },
        {
            label: 'Score',
            render: (fruit) => fruit.score,
            sortValue: (fruit) => fruit.score,
        },
        {
            label: 'Score sq',
            render: (fruit) => fruit.score**2,
            sortValue: (fruit) => fruit.score**2,
        },
    ];


    return <SortableTable data={data} config={config} keyFn={keyFn}  />
}




