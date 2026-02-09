import { Box, Container, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { AutoAwesomeRounded, StarsRounded, ScienceRounded } from '@mui/icons-material';
import { tabAtom } from "../../../../../../../../../hooks/usePersistentTab";
import { useRecoilState } from "recoil";


const tabsData = [
    {
        id: 0,
        label: "Diamond Jewellery",
        icon: <AutoAwesomeRounded fontSize="small" />,
        gradient: {
           bg: "linear-gradient(135deg, #FFF5F8 0%, #FDECF2 40%, #F8DDE7 100%)",
    color: "#7A3E55",
    border: "#f4c7d8"
        }
    },
    {
        id: 1,
        label: "Gold Jewellery",
        icon: <StarsRounded fontSize="small" />,
        gradient: {
            bg: "linear-gradient(135deg, #FFF4DA 0%, #F7E6BC 45%, #E8CF92 100%)",
            color: "#7A5A21",
            border: "#e8cf92"
        }
    },
    {
        id: 2,
        label: "Lab Grown Jewellery",
        icon: <ScienceRounded fontSize="small" />,
        gradient: {
            bg: "linear-gradient(135deg, #F1FFF7 0%, #E2F7ED 45%, #CFF2DF 100%)",
            color: "#2A6F56",
            border: "#b4e4cc"
        }
    },
];

const Customtab = () => {
  const [activeTab, setActiveTab] = useRecoilState(tabAtom);

    return (
        <Box sx={{ width: '100%', bgcolor: '#ffffff', mt:3 ,mb:3 }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        bgcolor: '#f5f5f5', // Neutral grey track
                        borderRadius: '99px', // Pill shape
                        p: 0.5,
                        border: '1px solid #e0e0e0',
                        boxShadow: 'inset 0px 2px 4px rgba(0,0,0,0.02)',
                    }}
                >
                    {tabsData.map((tab) => {
                        const isActive = activeTab === tab.id;

                        return (
                            <Box
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    height: '48px',
                                    zIndex: 2,
                                    borderRadius: '99px',
                                    transition: 'color 0.3s ease',
                                    color: isActive ? tab.gradient.color : '#9e9e9e',
                                }}
                            >
                                {/* 3. THE ANIMATED PILL BACKGROUND 
                                    (Only renders for the active item, but animates position via layoutId) 
                                */}
                                {isActive && (
                                    <Box
                                        component={motion.div}
                                        layoutId="activePill" // This ID connects the animation across state changes
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '99px',
                                            background: tab.gradient.bg,
                                            // border: `1px solid ${tab.gradient.border}`,
                                            boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
                                            zIndex: -1, // Behind the text
                                        }}
                                    />
                                )}

                                {/* TAB CONTENT */}
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ 
                                        display: 'flex', 
                                        // Animate icon slightly when active
                                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                        transition: 'transform 0.3s ease'
                                    }}>
                                        {tab.icon}
                                    </Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: isActive ? 700 : 500,
                                            fontSize: '15px',
                                        }}
                                    >
                                        {tab.label}
                                    </Typography>
                                </Stack>
                            </Box>
                        );
                    })}
                </Box>

            </Container>
        </Box>
    );
};

export default Customtab;