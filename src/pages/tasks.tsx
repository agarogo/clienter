"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  test1_percentage: number | null;
  test2_percentage: number | null;
  test3_percentage: number | null;
  test4_percentage: number | null;
}

const tests = [
  { id: "ancient-yakutia", title: "Древняя Якутия" },
  { id: "yakutia-17th-19th", title: "Якутия в XVII - XIX вв." },
  { id: "soviet-period", title: "Советский период(ЯАССР, репрессии)" },
  { id: "culture-traditions", title: "Культура и традиции Якутии" },
];

export default function TasksPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  const getPercentage = (index: number) => {
    if (!user) return null;
    return [
      user.test1_percentage,
      user.test2_percentage,
      user.test3_percentage,
      user.test4_percentage,
    ][index];
  };

  return (
    <div className="container p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 lg:mt-10">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center sm:text-left">Недавно пройденные</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tests.map((test, index) => {
          const percent = getPercentage(index);
          return (
            <div key={index} className="bg-gray-100 p-3 sm:p-4 rounded-xl">
              <p className="text-xs sm:text-sm border px-2 py-1 rounded-full w-max border-green-400 text-green-600">
                тест №{index + 1}
              </p>
              <p className="text-sm sm:text-base mt-2">пройдено {percent ?? 0}%</p>
            </div>
          );
        })}
      </div>

      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-center sm:text-left">Все</h2>
      <div className="space-y-4">
        {tests.map((test, index) => (
          <div key={test.id} className="bg-purple-500 text-white p-3 sm:p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center">
            <div>
              <p className="text-base sm:text-lg font-semibold">{test.title}</p>
              <p className="text-xs mt-1">ОТ НАС</p>
            </div>
            <button
              onClick={() => router.push(`/quiz/${test.id}`)}
              className="bg-black text-white px-3 sm:px-4 py-2 rounded-xl mt-2 sm:mt-0 text-sm sm:text-base"
            >
              пройти
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}