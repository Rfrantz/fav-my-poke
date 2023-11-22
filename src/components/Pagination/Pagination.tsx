import { useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

type PokemonsPaginationArgs = {
  count: number;
  limit: number;
  currentPage: number;
  goPage: (page: number) => void;
};

export const PokemonsPagination = ({
  count,
  limit,
  currentPage,
  goPage,
}: PokemonsPaginationArgs) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(count / limit);

  // Generate the pagination items. Memoize it. Update only when count or currentPage changes
  const pages = useMemo(() => {
    const paginationItems = [];

    // Render a Pagination.Item component for each page
    paginationItems.push(
      currentPage !== totalPages && currentPage !== totalPages - 1
        ? [currentPage, currentPage + 1].map((page) => (
            <Pagination.Item key={page} active={currentPage === page} onClick={() => goPage(page)}>
              {page}
            </Pagination.Item>
          ))
        : null,
    );

    // Add ellipsis
    if (currentPage < totalPages - 2) {
      paginationItems.push(
        <Pagination.Ellipsis key="ellipsis" onClick={() => goPage(currentPage + 1)} />,
      );
    }

    // Add the last two pages after ellipsis
    paginationItems.push(
      <>
        {[totalPages - 1, totalPages].map((page: number) => (
          <Pagination.Item key={page} active={currentPage === page} onClick={() => goPage(page)}>
            {page}
          </Pagination.Item>
        ))}
      </>,
    );

    return paginationItems;
  }, [currentPage, count]);

  return (
    // Render the pagination component with the generated items
    <Pagination key={'pagination'}>
      <Pagination.First key={'first'} onClick={() => goPage(1)} />
      <Pagination.Prev key={'prev'} onClick={() => goPage(currentPage - 1)} />

      {pages}

      <Pagination.Next key={'next'} onClick={() => goPage(currentPage + 1)} />
      <Pagination.Last key={'last'} onClick={() => goPage(totalPages)} />
    </Pagination>
  );
};
