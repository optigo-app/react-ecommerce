import { Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = createTheme({
    typography: {
        fontFamily: "'Georgia', 'Times New Roman', serif",
    },
    breakpoints: {
        values: { xs: 0, sm: 480, md: 768, lg: 1024, xl: 1280 },
    },
});

// ─── Reusable Section Header Components ───────────────────────────────────────

/**
 * ShopByDiamondType
 * Image 1 — centered serif title + soft subtitle, no eyebrow
 */
export function ShopByDiamondType({ title, subtitle, sx = {} }) {
    return (
        <Box
            sx={{
                width: "100%",
                py: { xs: 2.5, sm: 4, md: 6 },
                px: { xs: 2, sm: 4 },
                textAlign: "center",
                ...sx,
            }}
        >
            <Typography
                component="h2"
                sx={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontWeight: 400,
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem", lg: "2.5rem" },
                    color: "#3a3532",
                    letterSpacing: "0.01em",
                    lineHeight: 1.25,
                    mb: { xs: 1, md: 1.5 },
                }}
            >
                {title ?? "Shop by Diamond Type"}
            </Typography>
            <Typography
                sx={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: { xs: "0.78rem", sm: "0.85rem", md: "0.95rem" },
                    color: "#888078",
                    letterSpacing: "0.02em",
                    maxWidth: 480,
                    mx: "auto",
                }}
            >
                {subtitle ?? "Every diamond tells a story. Every creation becomes a cherished memory."}
            </Typography>
        </Box>
    );
}

/**
 * InTheSpotlight
 * Image 2 — small spaced eyebrow + large bold serif headline + italic subtitle
 */
export function InTheSpotlight({
    eyebrow,
    title,
    subtitle,
    sx = {},
}) {
    return (
        <Box
            sx={{
                width: "100%",
                py: { xs: 2.5, sm: 4, md: 6 },
                px: { xs: 2, sm: 4 },
                textAlign: "center",
                ...sx,
            }}
        >
            {/* Eyebrow */}
            {eyebrow && <Typography
                sx={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontWeight: 400,
                    fontSize: { xs: "0.6rem", sm: "0.68rem", md: "0.72rem" },
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#5a5550",
                    mb: { xs: 0.8, md: 1.2 },
                }}
            >
                {eyebrow}
            </Typography>}

            {/* Main title */}
            {title && <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontWeight: "bold",
                    fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2.2rem", lg: "2.8rem" },
                    color: "#2c2825",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                    mb: { xs: 1, md: 1.4 },
                }}
            >
                {title}
            </Typography>}

            {/* Subtitle */}
            {subtitle && <Typography
                sx={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: { xs: "0.78rem", sm: "0.85rem", md: "0.95rem" },
                    color: "#888078",
                    letterSpacing: "0.02em",
                    maxWidth: 480,
                    mx: "auto",
                }}
            >
                {subtitle}
            </Typography>}
        </Box>
    );
}

/**
 * CustomerFavorites
 * Image 3 — small spaced eyebrow + wide-tracked ALL-CAPS serif display
 */
export function CustomerFavorites({ eyebrow, title, sx = {} }) {
    return (
        <Box
            sx={{
                width: "100%",
                py: { xs: 2.5, sm: 4, md: 6 },
                px: { xs: 2, sm: 4 },
                textAlign: "center",
                ...sx,
            }}
        >
            {/* Eyebrow */}
            <Typography
                sx={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontWeight: 400,
                    fontSize: { xs: "0.6rem", sm: "0.68rem", md: "0.72rem" },
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#5a5550",
                    mb: { xs: 0.8, md: 1.2 },
                }}
            >
                {eyebrow ?? "Most Loved Designs"}
            </Typography>

            {/* Display title — all caps, wide tracking */}
            <Typography
                component="h2"
                sx={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontWeight: 400,
                    fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.4rem", lg: "3.2rem" },
                    color: "#2c2825",
                    letterSpacing: { xs: "0.08em", sm: "0.14em", md: "0.22em" },
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                }}
            >
                {title ?? "Customer Favorites"}
            </Typography>
        </Box>
    );
}

// ─── Demo — all three blocks stacked with dividers ────────────────────────────
export default function SectionHeadersDemo() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
                <Container maxWidth="lg" disableGutters>

                    {/* Block 1 */}
                    <ShopByDiamondType />

                    <Box sx={{ borderTop: "1px solid #e8e4de", mx: { xs: 2, sm: 4 } }} />

                    {/* Block 2 */}
                    <InTheSpotlight />

                    <Box sx={{ borderTop: "1px solid #e8e4de", mx: { xs: 2, sm: 4 } }} />

                    {/* Block 3 */}
                    <CustomerFavorites />

                </Container>
            </Box>
        </ThemeProvider>
    );
}