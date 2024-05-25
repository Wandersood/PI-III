import { Flowbite, Pagination } from "flowbite-react";
import { useState } from "react";
import { customTheme } from "../../../../../../components/Shared/FlowbiteCustomTheme/FlowbiteCustomTheme";

export function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <Flowbite theme={{ theme: customTheme }}>
    <div className="flex sm:justify-center mx-auto items-center my-20">
      <Pagination
          currentPage={currentPage}
          showIcons
          previousLabel=""
          nextLabel=""
        totalPages={10}
        onPageChange={onPageChange}
      />
      </div>
    </Flowbite>
  );
}
