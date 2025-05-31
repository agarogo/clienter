"use client";

import { useEffect, useState } from "react";

interface UserRating {
    nickname: string;
    avg_percentage: number;
}

export default function RatingPage() {
    const [ratings, setRatings] = useState<UserRating[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("https://backoik-back.up.railway.app/users/rating", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Ошибка загрузки рейтинга");
                const data = await res.json();
                setRatings(data);
            } catch {
                setError("Не удалось загрузить рейтинг");
            }
        };

        fetchRatings();
    }, []);

    return (
        <main className="container mt-6 sm:mt-8 lg:mt-10 px-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">Рейтинг пользователей</h1>

            {error && <div className="text-red-500 text-center mb-4 text-sm sm:text-base">{error}</div>}

            <ul className="space-y-4 max-h-[70vh] overflow-y-auto">
                {ratings.map((user, index) => (
                    <li
                        key={index}
                        className="bg-purple-500 text-white p-3 sm:p-4 rounded-lg flex justify-between items-center"
                    >
                        <span className="font-semibold text-sm sm:text-base">{index + 1}. {user.nickname}</span>
                        <span className="text-sm sm:text-lg">{user.avg_percentage.toFixed(1)}%</span>
                    </li>
                ))}
            </ul>
        </main>
    );
}