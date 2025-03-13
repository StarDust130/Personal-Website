import { Metadata } from "next";
import Quiz from "../components/quiz/Quiz";

export const metadata: Metadata = {
  title: "Quiz - Chandrashekhar",
  description:
    "Challenge yourself with fun quizzes on web development, JavaScript, React, and more!",
  keywords:
    "Quiz, Web Development Quiz, JavaScript Quiz, React Quiz, Chandrashekhar",
  openGraph: {
    title: "Quiz - Test Your Knowledge | Chandrashekhar",
    description:
      "Challenge yourself with fun quizzes on web development, JavaScript, React, and more!",
    url: "https://chandrashekhar.life/quiz",
    siteName: "Chandrashekhar",
    images: [
      {
        url: "https://chandrashekhar.life/quiz-og.jpg", // Add a proper OG image
        width: 1200,
        height: 630,
        alt: "Quiz - Test Your Knowledge",
      },
    ],
    type: "website",
  },
};


const QuizPage = () => {
  return <Quiz />;
};

export default QuizPage;
