import { generateMedia } from "styled-media-query";
const customMedia = generateMedia({
  mobile: "599px",
  desktop: "1025px",
});
export const MobaileSiteStyle = customMedia.lessThan("mobile");
export const TabletSiteStyle = customMedia.between("mobile", "desktop");
export const PcSiteStyle = customMedia.greaterThan("desktop");
