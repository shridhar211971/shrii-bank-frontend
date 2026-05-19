import axiosInstance from "../../api/axois";

import ENDPOINTS from "../../api/endpoints";

const getAuditTotals = async () => {

  const response = await axiosInstance.get(
    ENDPOINTS.AUDITOR.TOTALS
  );

  return response.data;
};

const auditorService = {
  getAuditTotals,
};

export default auditorService;