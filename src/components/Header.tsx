"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  return { isAuthenticated };
};

const Header: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (path: string) => {
    if (!isAuthenticated && (path === "/tasks" || path === "/Learn")) {
      router.push("/login");
    } else {
      router.push(path);
    }
    setIsMenuOpen(false); // Закрываем меню после клика
  };

  const links = [
    { name: "Задания", path: "/tasks" },
    { name: "Рейтинг", path: "/rating" },
  ];

  return (
    <header className="bg-[#F5F5F5] w-full rounded-full mx-auto py-3 px-4 sm:px-8 lg:px-24 flex justify-between items-center mt-4 sm:mt-5 relative">
      <div
        onClick={() => handleLinkClick("/")}
        className="mon text-lg sm:text-xl lg:text-2xl font-bold text-[#0A1044] cursor-pointer"
      >
        Саха тыына
      </div>
      {/* Кнопка гамбургера для мобильных */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden text-2xl focus:outline-none"
      >
        {/* Иконка гамбургера (можно заменить на SVG или иконку из библиотеки) */}
        <span className="text-[#0A1044]">☰</span>
      </button>
      {/* Меню для больших экранов */}
      <div className="hidden sm:flex justify-center flex-1">
        <div className="flex space-x-6">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.path)}
              className="text-[#0A1044] hover:text-blue-800 text-sm sm:text-base lg:text-lg font-medium"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
      {/* Кнопки авторизации для больших экранов */}
      <div className="hidden sm:flex space-x-4">
        {isAuthenticated ? (
          <button
            onClick={() => handleLinkClick("/profile")}
            className="text-[#000000] font-semibold border border-[#000000] px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base"
          >
            Профиль
          </button>
        ) : (
          <>
            <button
              onClick={() => handleLinkClick("/register")}
              className="text-[#000000] font-semibold border border-[#000000] px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base"
            >
              Регистрация
            </button>
            <button
              onClick={() => handleLinkClick("/login")}
              className="text-white font-semibold border bg-black border-[#000000] px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base"
            >
              Войти
            </button>
          </>
        )}
      </div>
      {/* Выпадающее меню для мобильных */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 sm:hidden z-10">
          <div className="flex flex-col space-y-2">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.path)}
                className="text-[#0A1044] hover:text-blue-800 text-sm font-medium text-left"
              >
                {link.name}
              </button>
            ))}
            <div className="border-t mt-2 pt-2">
              {isAuthenticated ? (
                <button
                  onClick={() => handleLinkClick("/profile")}
                  className="text-[#000000] font-semibold border border-[#000000] px-3 py-2 rounded-full text-sm w-full text-center"
                >
                  Профиль
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleLinkClick("/register")}
                    className="text-[#000000] font-semibold border border-[#000000] px-3 py-2 rounded-full text-sm w-full text-center mt-2"
                  >
                    Регистрация
                  </button>
                  <button
                    onClick={() => handleLinkClick("/login")}
                    className="text-white font-semibold border bg-black border-[#000000] px-3 py-2 rounded-full text-sm w-full text-center mt-2"
                  >
                    Войти
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;