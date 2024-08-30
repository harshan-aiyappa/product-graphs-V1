// src/Layout.js
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Box, Button, Stack, Pagination } from "@mui/material";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  // Adjust this array to have 20 pages
  const pages = Array.from({ length: 50 }, (_, index) => `/Page${index + 1}`);

  useEffect(() => {
    const currentPageIndex = pages.indexOf(location.pathname) + 1;
    setCurrentPage(currentPageIndex > 0 ? currentPageIndex : 1);
  }, [location.pathname]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    navigate(pages[page - 1]);
  };

  const handleHome = () => {
    setCurrentPage(1);
    navigate("/"); // Adjust this to match your home route
  };

  const isHomePage = location.pathname === "/";

  return (
    <Box
      sx={{
        minWidth: "90vw",
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh",
        p:1
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto", // Allows content to scroll if needed
        }}
      >
        <Outlet /> {/* This will render the content of the current page */}
      </Box>
      {!isHomePage && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "background.paper",
            padding: 2,
            boxShadow: 3,
            zIndex: 1100, // Ensure it's above other content
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginBottom: 2,
            }}
          >
            <Button
              onClick={handleHome}
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Home
            </Button>
            <Pagination
              count={pages.length}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                marginTop: 1,
              }}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default Layout;
