import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DataTableProps<T> {
    columns: Array<{ key: keyof T; label: string }>;
    data: T[];
    rowsPerPage?: number;
}

const DataTableNew = <T extends Record<string, any>>({
    columns,
    data,
    rowsPerPage = 10,
}: DataTableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const filteredData = data.filter((row) =>
        columns.some((column) => {
            const value = row[column.key];
            return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
        })
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full border rounded-md shadow-md">
            <div className="p-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full"
                />
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key.toString()}
                                className="border-b p-2 text-left font-medium"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column.key.toString()} className="border-b p-2">
                                    {row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between p-4">
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Önceki
                </Button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Sonraki
                </Button>
            </div>
        </div>
    );
};

export default DataTableNew;
