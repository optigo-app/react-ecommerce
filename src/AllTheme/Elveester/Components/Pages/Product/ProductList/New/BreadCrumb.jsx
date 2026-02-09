import { Box, Chip, useTheme, useMediaQuery, Skeleton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRightRounded";
import { useLocation, useNavigate } from "react-router-dom";

const chipBaseStyles = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#444",
  backgroundColor: "#fafafa",
  borderRadius: 15,
  border: "1px solid #e5e5e5",
  px: 1,
  height: 26, // 👈 reduced height (premium feel)
  display: "flex",
  alignItems: "center",
  transition: "all 0.2s ease",
  boxShadow: "0 0 0 0 rgba(0,0,0,0)",
};

const chipPrimaryStyles = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#fff",
  backgroundColor: "#0a1f47",
  borderRadius: 15,
  px: 1.2,
  height: 26,
  border: "1px solid #0a1f47",
  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#0a1f47",
    borderColor: "#0a1f47",
  },
};

// #0a1f47


const BreadCrumbBar = ({ isFiltering, decodeURIComponent, productListData, IsBreadCumShow, BreadCumsObj, handleBreadcums }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  if (isFiltering) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 0.5,
          mt: 1,
          mb: 1,
        }}
      >
        {Array?.from(new Array(3)).map((_, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="rounded"
              width={isMobile ? 70 : 100}
              height={isMobile ? 24 : 28}
              sx={{
                borderRadius: 10,
                bgcolor: "#f2f2f2",
                animation: "wave",
              }}
            />
            {i < 2 && (
              <ChevronRightIcon
                sx={{
                  fontSize: 18,
                  color: "#c5c5c5",
                  mx: 0.3,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    );
  }

  if (!productListData?.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 0.6,
        mt: 1,
        mb: 2,
      }}
    >
      <Chip
        label="Home"
        onClick={() => navigate("/")}
        size={isMobile ? "small" : "medium"}
        clickable
        sx={chipBaseStyles}
      />

      {/* Chevron */}
      <ChevronRightIcon
        sx={{
          fontSize: 18,
          color: "#bdbdbd",
        }}
      />

      {/* 🆕 New Arrival or S Path or Breadcrumbs Object */}
      {location?.search?.charAt(1) === "N" && (
        <Chip
          label="New Arrival"
          size={isMobile ? "small" : "medium"}
          sx={chipPrimaryStyles}
        />
      )}

      {location?.search?.charAt(1) === "S" && (
        <Chip
          label={decodeURIComponent(location?.pathname?.split("/")[2])}
          size={isMobile ? "small" : "medium"}
          sx={chipBaseStyles}
        />
      )}

      {IsBreadCumShow && (
        <>
          {BreadCumsObj()?.menuname && (
            <>
              <Chip
                label={BreadCumsObj()?.menuname}
                onClick={() =>
                  handleBreadcums({
                    [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                  }, BreadCumsObj()?.menuname?.toLowerCase() === "collection")
                }
                size={isMobile ? "small" : "medium"}
                clickable
                sx={chipPrimaryStyles}

              />

              {BreadCumsObj()?.FilterVal1 && (
                <>
                  <ChevronRightIcon sx={{ fontSize: 18, color: "#bdbdbd" }} />
                  <Chip
                    label={BreadCumsObj()?.FilterVal1}
                    onClick={() =>
                      handleBreadcums({
                        [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                        [BreadCumsObj()?.FilterKey1]: BreadCumsObj()?.FilterVal1,
                      })
                    }
                    size={isMobile ? "small" : "medium"}
                    clickable
                    sx={chipPrimaryStyles}

                  />
                </>
              )}

              {BreadCumsObj()?.FilterVal2 && (
                <>
                  <ChevronRightIcon sx={{ fontSize: 18, color: "#bdbdbd" }} />
                  <Chip
                    label={BreadCumsObj()?.FilterVal2}
                    onClick={() =>
                      handleBreadcums({
                        [BreadCumsObj()?.FilterKey]: BreadCumsObj()?.FilterVal,
                        [BreadCumsObj()?.FilterKey1]: BreadCumsObj()?.FilterVal1,
                        [BreadCumsObj()?.FilterKey2]: BreadCumsObj()?.FilterVal2,
                      })
                    }
                    size={isMobile ? "small" : "medium"}
                    clickable
                    sx={chipPrimaryStyles}

                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default BreadCrumbBar;
