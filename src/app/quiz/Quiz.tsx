"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";

interface Question {
    id: number;
    question_text: string;
    correct_answer: string;
    option1: string;
    option2: string;
    option3: string;
}

interface QuestionWithOptions extends Question {
    shuffledOptions: string[];
}

function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export default function Quiz() {
    const { isAuthenticated, isLoading } = useAuthRedirect();
    const router = useRouter();
    const params = useParams();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [questionsLoaded, setQuestionsLoaded] = useState(false);

    const questionsRef = useRef<QuestionWithOptions[] | null>(null);

    const testTypes: {
        [key: string]: { testType: number; skip: number; limit: number };
    } = {
        "ancient-yakutia": { testType: 1, skip: 0, limit: 25 },
        "yakutia-17th-19th": { testType: 2, skip: 25, limit: 25 },
        "soviet-period": { testType: 3, skip: 50, limit: 25 },
        "culture-traditions": { testType: 4, skip: 75, limit: 25 },
    };

    const testName = typeof params?.testId === "string" ? params.testId : null;
    const testConfig = testName ? testTypes[testName] : undefined;

    useEffect(() => {
        if (!isAuthenticated || !testConfig || questionsRef.current) return;

        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `http://localhost:8000/quiz/questions/?skip=${testConfig.skip}&limit=${testConfig.limit}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (!response.ok) throw new Error("Не удалось загрузить вопросы");
                const data: Question[] = await response.json();

                const shuffled = shuffleArray(data).map((q) => ({
                    ...q,
                    shuffledOptions: shuffleArray([
                        q.correct_answer,
                        q.option1,
                        q.option2,
                        q.option3,
                    ]),
                }));

                questionsRef.current = shuffled;
                setQuestionsLoaded(true);
            } catch {
                setError("Ошибка загрузки вопросов");
            }
        };

        fetchQuestions();
    }, [isAuthenticated, testConfig]);

    const handleAnswer = (answer: string) => {
        const currentQuestion = questionsRef.current?.[currentQuestionIndex];
        if (!currentQuestion) return;

        setAnswers((prev) => ({
            ...prev,
            [String(currentQuestion.id)]: answer,
        }));

        if (currentQuestionIndex < (questionsRef.current?.length || 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8000/quiz/submit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    answers,
                    test_type: testConfig?.testType,
                    skip: testConfig?.skip,
                    limit: testConfig?.limit,
                }),
            });

            if (!response.ok) throw new Error("Ошибка отправки теста");
            router.push("/tasks");
        } catch {
            router.push("/tasks");
        }
    };

    const questions = questionsRef.current;

    if (isLoading || !questionsLoaded || !questions)
        return <div className="text-center mt-20 text-sm sm:text-base">Загрузка...</div>;
    if (!isAuthenticated || !testConfig)
        return (
            <div className="text-center text-red-500 mt-20 text-sm sm:text-base">
                Некорректный маршрут теста
            </div>
        );
    if (error)
        return <div className="text-red-500 text-center mt-20 text-sm sm:text-base">{error}</div>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <section className="container mt-10 sm:mt-20 bg-white py-6 sm:py-8 lg:py-10 px-4 sm:px-6 rounded-[32px] shadow-md">
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-center mb-4 sm:mb-6 font-bold text-[#0A1044]">
                Вопрос {currentQuestionIndex + 1} из {questions.length}
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                <div className="bg-yellow-300 text-[#0A1044] text-sm sm:text-base lg:text-lg p-4 sm:p-6 rounded-[20px] shadow">
                    {currentQuestion.question_text}
                </div>
                <div className="space-y-3 sm:space-y-4">
                    {currentQuestion.shuffledOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className="block w-full bg-green-300 text-[#0A1044] font-medium text-sm sm:text-base p-3 sm:p-4 rounded-[20px] hover:bg-blue-600 hover:text-white transition duration-300 shadow"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}