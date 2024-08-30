// src/CustomPagination.js
import React from "react";
import { Pagination, Stack } from "@mui/material";

function CustomPagination({ count, page, onPageChange }) {
  // Number of pages to show in the pagination range
  const range = 10;
  const halfRange = Math.floor(range / 2);

  // Calculate the start and end page numbers for the pagination range
  let start = Math.max(1, page - halfRange);
  let end = Math.min(count, page + halfRange);

  // Adjust the start and end if there's not enough space at the start or end
  if (end - start < range - 1) {
    if (start === 1) {
      end = Math.min(count, end + (range - (end - start)));
    } else {
      start = Math.max(1, start - (range - (end - start)));
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        color="primary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "text.primary", // Default color for pagination items
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "primary.main", // Color for the selected page
            color: "background.paper", // Color for the selected page text
          },
          "& .MuiPaginationItem-previousNext": {
            color: "text.secondary", // Color for Previous/Next buttons
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "text.disabled", // Color for ellipsis
          },
        }}
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item) => (
          <>
            {item.type === "start-ellipsis" || item.type === "end-ellipsis" ? (
              <Pagination.Item {...item} />
            ) : (
              item.page >= start &&
              item.page <= end && <Pagination.Item {...item} />
            )}
          </>
        )}
      />
    </Stack>
  );
}

export default CustomPagination;
