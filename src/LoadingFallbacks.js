import { Box, CircularProgress } from "@mui/material";
import { useRecoilState } from "recoil";
import { smr_companyLogo } from "./AllTheme/SmilingRock/Components/Recoil/atom";
import { IsSetupFor } from "./AllTheme/Elveester/Components/Recoil/atom";
import mobileLogo from './utils/assets/loader/mobileLogo.png';
import webLogo from './utils/assets/loader/webLogo.png';
import Gif_Loder from './utils/assets/loader/Gif_Loder.gif';
import shreeLogo from './utils/assets/loader/shreeLogo.png';
import kamalikaLogo from './utils/assets/loader/kamalikaLogo.png';
import varaLogo from './utils/assets/loader/varaLogo.png';
import pacificLogo from './utils/assets/loader/pacificLogo.png';
import ojasviLogo from './utils/assets/loader/ojasviLogo.png';
import shinjiniLogo from './utils/assets/loader/shinjiniLogo.png';
import sarafflogo from './utils/assets/loader/sarafflogo.png';
import shanthaLogo from './utils/assets/loader/shantha.png';


// shantha.png


export const ShanthaLoaderFallback = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <img src={shanthaLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
      </Box>
    </>
  );
};

export const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    {/* <CircularProgress sx={{ color: 'rgba(255, 87, 34, 0.8)' }} /> */}
    <CircularProgress sx={{ color: "#E1A271" }} />
  </Box>
);

export const ELiorLoaderFallback = () => {
  const [companyTitleLogo] = useRecoilState(smr_companyLogo);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <img src={companyTitleLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
      </Box>
    </>
  );
};

export const DefaultLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <img src={mobileLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
  </Box>
);

export const ElveeLoadingFallback = () => {
  const Logo = IsSetupFor ? webLogo : Gif_Loder;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <img
          src={Logo}
          alt="Loading..."
          width="auto"
          loading="lazy"
          className={IsSetupFor ? "loading_logo_7946" : ""}
          style={{
            maxWidth: "200px",
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
    </>
  );
};

export const ShreeDiamondsLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <img src={shreeLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
  </Box>
);

export const KamalikaJewelssLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <img src={kamalikaLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
  </Box>
);

export const VaraLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <img src={varaLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
  </Box>
);

export const PacificLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <img src={pacificLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
  </Box>
);

export const OjasviLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <img src={ojasviLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
  </Box>
);

export const ShinjiniLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <img src={shinjiniLogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
  </Box>
);

export const SaraffLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#fff",
    }}
  >
    <img src={sarafflogo} alt="Loading..." height="100%" width="auto" loading="lazy" />
  </Box>
);

export const ProcatalogLoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <CircularProgress sx={{ color: "rgba(255, 87, 34, 0.8)" }} />
  </Box>
);
