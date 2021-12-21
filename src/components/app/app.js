import { useState } from "react";

import "./app.css";

import BreadCrumbs from "../bread-crumbs/bread-crumbs";
import Title from "../title/title";
import Form from "../form/form";
import TaskList from "../task-list/task-list";

export default function App() {
  const [data, setData] = useState([
    {
      id: 1,
      status: "to do",
      cards: [
        {
          id: "FC-7",
          title: "Задача № 1",
          subtitle:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "major",
        },
        {
          id: "BC–14",
          title: "Задача № 1",
          subtitle:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "unkown",
        },
        {
          id: "BC–11",
          title: "Задача № 1",
          subtitle:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "unkown",
        },
        {
          id: "FC-9",
          title: "Задача № 1",
          subtitle:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "critical",
        },
        {
          id: "FC-8",
          title: "Задача № 1",
          subtitle:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "major",
        },
      ],
    },
    {
      id: 2,
      status: "in progress",
      cards: [
        {
          id: "MAR-10",
          title: "Задача № 2",
          subtitle: "Описание задачи 2",
          storyPoints: 3,
          priority: "major",
        },
        {
          id: "MAR-11",
          title: "Задача № 2",
          subtitle: "Описание задачи 2",
          storyPoints: 3,
          priority: "unkown",
        },
      ],
    },
    {
      id: 3,
      status: "test",
      cards: [
        {
          id: "MAR-12",
          title: "Задача № 2",
          subtitle: "Описание задачи 2",
          storyPoints: 3,
          priority: "minor",
        },
        {
          id: "MAR-13",
          title: "Задача № 2",
          subtitle: "Описание задачи 2",
          storyPoints: 3,
          priority: "major",
        },
      ],
    },
    {
      id: 4,
      status: "done",
      cards: [
        {
          id: "MAR-14",
          title: "Задача № 2",
          subtitle: "Описание задачи 2",
          storyPoints: 3,
          priority: "minor",
        },
        {
          id: "MAR-15",
          title: "Задача № 2",
          subtitle: "Описание задачи 2",
          storyPoints: 3,
          priority: "normal",
        },
      ],
    },
  ]);

  return (
    <main className="App">
      <BreadCrumbs />
      <Title title="Issue Boards" />
      <Form />
      <div className="task-container">
        {data.map((i) => (
          <TaskList key={i.id} prop={i} />
        ))}
      </div>
    </main>
  );
}
