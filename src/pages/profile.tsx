"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState({ nickname: "", email: "", test1: 0, test2: 0, test3: 0, test4: 0 });

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("https://backoik-back.up.railway.app/users/me", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Ошибка загрузки профиля");
                return res.json();
            })
            .then(data => {
                setUser({
                    nickname: data.nickname,
                    email: data.email,
                    test1: data.test1_percentage,
                    test2: data.test2_percentage,
                    test3: data.test3_percentage,
                    test4: data.test4_percentage,
                });
            })
            .catch(err => {
                console.error("Ошибка:", err);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className="container flex flex-col sm:flex-row p-4 sm:p-6 lg:p-8">
            <div className="w-full sm:w-1/4 h-auto sm:h-[80vh] bg-black rounded-[24px] p-4 sm:p-6 text-white flex flex-col items-center mb-4 sm:mb-0">
                <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-purple-600 rounded-full mb-4"></div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">{user.nickname}</h2>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300">{user.email}</p>
                <button
                    onClick={handleLogout}
                    className="mt-4 sm:mt-6 bg-white text-black px-3 sm:px-4 py-2 rounded-full hover:bg-gray-200 text-sm sm:text-base"
                >
                    Выйти
                </button>
            </div>
            <div className="w-full sm:w-3/4 sm:ml-6 flex flex-col">
                <div className="space-y-4">
                    <div className="bg-green-300 h-24 sm:h-28 lg:h-32 rounded-[20px]"></div>
                    <div className="bg-yellow-300 h-24 sm:h-28 lg:h-32 rounded-[20px]"></div>
                    <div className="bg-purple-600 p-4 sm:p-6 rounded-[20px]">
                        <h3 className="text-white text-base sm:text-lg lg:text-xl mb-2">Задания</h3>
                        <div className="space-y-2">
                            {[
                                { label: "Древняя Якутия", score: user.test1 },
                                { label: "Якутия в XVII - XIX вв.", score: user.test2 },
                                { label: "Советский период(ЯАССР, репрессии)", score: user.test3 },
                                { label: "Культура и традиции Якутии", score: user.test4 },
                            ].map((task, index) => (
                                <div key={index} className="flex justify-between items-center bg-purple-400 p-2 sm:p-3 rounded-[12px]">
                                    <span className="text-white text-sm sm:text-base">{task.label}</span>
                                    <div className="flex space-x-2">
                                        <span className="text-white text-sm sm:text-base">{task.score}/100</span>
                                        <span className="text-white bg-purple-300 px-2 py-1 rounded-full text-xs sm:text-sm">
                                            {Math.round((task.score / 100) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;