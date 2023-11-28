import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions when the component mounts
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      //.then((data) => console.log(data))
  }, []);

  function handleAddQuestion(newQuestion) {
    // Update the questions state with the new question
    setQuestions([...questions, newQuestion]);
    // Switch to the QuestionList page after adding the question
    setPage("List");
  }

  function handleDeleteQuestion(questionId) {
    // Update the questions state by filtering out the deleted question
    setQuestions(questions.filter((question) => question.id !== questionId));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
