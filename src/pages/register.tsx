"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Register: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("https://backer-back.up.railway.app/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: name,
                    email,
                    password,
                    test1_percentage: 0,
                    test2_percentage: 0,
                    test3_percentage: 0,
                    test4_percentage: 0,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Ошибка регистрации");
            }

            await response.json();
            router.push("/login");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Неизвестная ошибка");
            }
        }

    };

    return (
        <div className="min-h-screen flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 flex">
                <div className="w-full sm:w-[95%] h-[50vh] sm:h-[95%] mx-auto my-auto bg-[#1F1F1F] rounded-[24px]"></div>
            </div>
            <div className="w-full sm:w-1/2 bg-white rounded-r-lg p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-black text-center">Создать аккаунт</h2>
                    <p className="text-sm sm:text-base lg:text-lg mb-6 text-center">
                        Уже зарегистрированы? <Link href="/login" className="hover:underline">Войти</Link>
                    </p>
                    {error && <p className="text-red-500 text-center mb-4 text-sm sm:text-base">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="фамилия и имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-full text-sm sm:text-base"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-full text-sm sm:text-base"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-full text-sm sm:text-base"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white p-2 sm:p-3 rounded-full hover:bg-gray-800 text-sm sm:text-lg"
                        >
                            Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;