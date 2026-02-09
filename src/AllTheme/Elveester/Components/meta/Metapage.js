import { useLocation } from "react-router-dom";
import MetaData from "./MetaData";
import { metaData, defaultMetadata } from "./content";


const MetaPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const matchedKey = Object.keys(metaData).find((key) => {
    if (key.includes("*")) {
      const pattern = new RegExp("^" + key.replace("*", ".*") + "$");
      return pattern.test(currentPath);
    }
    return currentPath === key;
  });

  const pageMetadata = matchedKey ? metaData[matchedKey] : defaultMetadata;

  return <MetaData title={pageMetadata.title} description={pageMetadata.description} canonical={pageMetadata.canonical} keywords={pageMetadata.keywords} />;
};

export default MetaPage;
