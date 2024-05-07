import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";
import IconLeft from "@/icons/IconLeft";
import IconRight from "@/icons/IconRight";

type PaginationProps = {
  totalPages: number;
  lastPage: number;
  firstPage: number;
  currentPage: number;
};

const Pagination = ({totalPages, currentPage, firstPage, lastPage}: PaginationProps) => {
  const router = useRouter();
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      router.push(`/?page=${currentPage + 1}`);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      router.push(`/?page=${currentPage - 1}`);
    }
  };
  const goToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };


  useEffect(() => {
    const calculateVisiblePages = (currentPage: number, totalPages: number, firstPage: number, lastPage: number): number[] => {
      const visibleCount = 10;
      let startPage = Math.max(firstPage, currentPage - Math.floor(visibleCount / 2));
      let endPage = Math.min(lastPage, currentPage + Math.floor(visibleCount / 2));
      if (endPage - startPage + 1 < visibleCount) {
        startPage = Math.max(firstPage, endPage - visibleCount + 1);
      }

      return [startPage, endPage];
    };
    const [startPage, endPage] = calculateVisiblePages(currentPage, totalPages, firstPage, lastPage);

    const visiblePages = Array.from({length: endPage - startPage + 1}, (_, index) => startPage + index);
    setVisiblePages(visiblePages);

  }, [currentPage, totalPages, firstPage, lastPage]);

  return (
    <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1} className="pagination__link">
        <IconLeft/>
      </button>
      {visiblePages.map((page) => (
        <button key={page}
                onClick={() => goToPage(page)}
                className={"pagination__link" + (currentPage === page ? '_active' : '')}>
          {page}
        </button>
      ))}
      <div>
      </div>
      <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination__link">
        <IconRight/>
      </button>
    </div>
  );
};

export default Pagination;
