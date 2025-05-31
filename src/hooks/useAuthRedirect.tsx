import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuthRedirect = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Проверка валидности токена (опционально, можно запросить /users/me)
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push("/login");
        }
        setIsLoading(false);
    }, [router]);

    return { isAuthenticated, isLoading };
};
export default useAuthRedirect;