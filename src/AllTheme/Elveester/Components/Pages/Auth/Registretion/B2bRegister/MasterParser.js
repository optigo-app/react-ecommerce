function getMasterOptions() {
    try {
      const raw = sessionStorage.getItem("B2BRegisterMasterApi");
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (typeof parsed !== "object" || parsed === null) return {};
  
      const allItems = Object.values(parsed).flat();
      const grouped = allItems.reduce((acc, item) => {
        const { MasterName, ...rest } = item;
        if (!MasterName) return acc;
  
        if (!acc[MasterName]) {
          acc[MasterName] = { options: [] };
        }
        acc[MasterName]?.options.push(rest);
  
        return acc;
      }, {}); 
      return grouped;
    } catch (err) {
      console.error("Failed to normalize B2BRegisterMasterApi:", err);
      return {};
    }
  }
  
  export default getMasterOptions;

  
