import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const MaxHeader = ({ alignment = "left", title, subtitle, extra }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:
          alignment === "left"
            ? "flex-start"
            : alignment === "center"
            ? "center"
            : "flex-end",
        flexDirection: "column",
        px: 2,
        marginBlock:'44px'
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: alignment, fontWeight: "bold" }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="subtitle1"
          color="common.black"
          sx={{ textAlign: alignment, mt: 0.5 }}
        >
          {subtitle}
        </Typography>
      )}

      {extra && <Box sx={{ mt: 1 }}>{extra}</Box>}
    </Box>
  );
};

MaxHeader.propTypes = {
  alignment: PropTypes.oneOf(["left", "center", "right"]),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  extra: PropTypes.node,
};

export default MaxHeader;
