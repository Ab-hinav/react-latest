

export default function Table({ data, headings }: { data: object[], headings: string[] }) {

    console.log(data, headings);
    const renderedData = (data: object[]) => {
        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan={headings.length} className="px-4 py-4 text-center text-gray-500">
                        No data
                    </td>
                </tr>
            );
        } else {
            return data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                    {Object.entries(item).map(([key, value]) => (
                        <td key={key} className="px-4 py-2 text-sm text-gray-800">
                            {value as string}
                        </td>
                    ))}
                </tr>
            ));
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        {headings.length > 0 && headings.map((value, index) => (
                            <th
                                key={index}
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                            >
                                {value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {renderedData(data)}
                </tbody>
            </table>
        </div>
    );
}