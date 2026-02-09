import { Tabs, Tab } from "@mui/material";
import { styled } from "@mui/styles";

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: "48px",
    zIndex: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: "40px",
    padding: "3px",
    position: "relative",
    border: '1px solid #d4af37', // Gold border

    "& .MuiTabs-flexContainer": {
        gap: "8px",
    },

    "& .MuiTabs-indicator": {
        height: "100%",
        borderRadius: '50px',
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        zIndex: 0,
        backgroundColor: "#ECEBE7",
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    minHeight: "40px",
    minWidth: "auto",
    borderRadius: '50px',
    color: "#5f6368",
    padding: "6px 16px",
    position: "relative", // ✅ Ensure text sits above the indicator
    zIndex: 1, // ✅ Bring tab content above indicator
    transition: "color 0.2s ease",

    "&.Mui-selected": {
        fontWeight: 600,
    },
}));

// example usecase

//  <StyledTabs value={activeTab} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary" aria-label="Sale Types">
//             <StyledTab disableRipple label="Quick Sale" />
//             <StyledTab disableRipple label="Cash Sale" />
//             <StyledTab disableRipple label="Normal" />
//           </StyledTabs>


export {
    StyledTabs,
    StyledTab
}