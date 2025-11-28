import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Pagination, PaginationInfo, PaginationSizeSelector } from '@vormir/react';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      total={100}
      pageSize={10}
      page={page}
      onPageChange={setPage}
    />
  );
};

export const WithInfo = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  return (
    <div className="space-y-4">
      <Pagination
        total={250}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
      />
      <PaginationInfo total={250} pageSize={pageSize} page={page} />
    </div>
  );
};

export const WithSizeSelector = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="space-y-4">
      <PaginationSizeSelector
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1); // Reset to first page
        }}
      />
      <Pagination
        total={500}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
      />
      <PaginationInfo total={500} pageSize={pageSize} page={page} />
    </div>
  );
};

export const Outline = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      total={100}
      pageSize={10}
      page={page}
      onPageChange={setPage}
      variant="outline"
    />
  );
};

export const Sizes = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-4">
      <Pagination
        total={100}
        pageSize={10}
        page={page}
        onPageChange={setPage}
        size="sm"
      />
      <Pagination
        total={100}
        pageSize={10}
        page={page}
        onPageChange={setPage}
        size="md"
      />
      <Pagination
        total={100}
        pageSize={10}
        page={page}
        onPageChange={setPage}
        size="lg"
      />
    </div>
  );
};

export const Simple = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      total={100}
      pageSize={10}
      page={page}
      onPageChange={setPage}
      showFirstLast={false}
      showPageNumbers={false}
    />
  );
};
