import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useQuery = function () {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
};
