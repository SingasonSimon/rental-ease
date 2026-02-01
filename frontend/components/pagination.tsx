"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Show limited page numbers with ellipsis
    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;

        if (currentPage <= 3) {
            return [...pages.slice(0, 5), -1, totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, -1, ...pages.slice(totalPages - 5)];
        }

        return [1, -1, currentPage - 1, currentPage, currentPage + 1, -2, totalPages];
    };

    const visiblePages = getVisiblePages();

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {visiblePages.map((page, idx) =>
                page < 0 ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                        ...
                    </span>
                ) : (
                    <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="icon"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                )
            )}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
