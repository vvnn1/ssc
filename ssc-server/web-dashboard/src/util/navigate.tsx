import { useCallback } from "react";
import { NavigateFunction, NavigateOptions, Path, To, parsePath, useLocation, useNavigate } from "react-router-dom";

export function useMineNavigate(): NavigateFunction {
    const navigate: NavigateFunction = useNavigate();
    const { pathname, search } = useLocation();

    const mineNavigate: NavigateFunction = useCallback(
        (to: To | number, options: NavigateOptions = {}) => {
            if (typeof to === "number") {
                navigate(to);
                return;
            }

            if (!search) {
                navigate(to, options);
                return;
            }

            let path: Partial<Path>;
            if (typeof to === "string") {
                path = parsePath(to);
            } else {
                path = to;
            }

            if (path.search) {
                path.search += "&" + search.slice(1);
            } else {
                path.search = search;
            }

            navigate(path, options);
        },
        [pathname, search]
    );
    return mineNavigate;
}
