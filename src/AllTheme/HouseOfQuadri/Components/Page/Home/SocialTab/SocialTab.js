import React from "react";
import "./SocialTab.modul.scss";
import { FaInstagram } from "react-icons/fa";
import { socialLink } from "../../../Constants/SocialLinks";
import { Box } from "@mui/material";

const SocialTab = ({ data, isThemeActive }) => {
  return (
    <Box className="hoq_main_SocialTab" sx={{ ...(isThemeActive && { marginBottom: "6rem" }) }}>
      <div className="header">
        <h1>Follow Us : @Lorem ipsum dolor sit amet.</h1>
      </div>
      <div className="social_row">
        {socialLink?.slice(0, 4)?.map(({ img, icon }, i) => {
          return (
            <div key={i} className="social_card" style={{ filter: i % 2 ? "grayscale(50)" : "" }}>
              <img src={data?.image[i]} alt={img} />
              <div className="icon_overlayer">
                <a target="_blank" href={"https://www.instagram.com/shantha_jewellers?igsh=MThrbTMwMXY5Ynk3eA%3D%3D&utm_source=qr"}>
                  {icon}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default SocialTab;
