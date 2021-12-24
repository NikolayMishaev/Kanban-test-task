const DATA_BOARDS = [
  {
    id: 1,
    status: "to do",
    cards: [
      {
        id: "FC-7",
        title: "Задача № 1",
        description:
          "При поиске при отсутствии результата, выводить сообщение с текстом: 'по указанному запросу данные не найдены' ",
        storyPoints: 2,
        priority: "major",
      },
      {
        id: "BC–14",
        title: "Задача № 2",
        description: "Добавить ф-ию дебоунс к поиску и к драг дропу",
        storyPoints: 2,
        priority: "unkown",
      },
      {
        id: "BC–11",
        title: "Задача № 3",
        description:
          "Добавить возможность добавления задачи в конец при перетаскивании",
        storyPoints: 2,
        priority: "unkown",
      },
      {
        id: "FC-9",
        title: "Задача № 4",
        description: "Сделать возможным добавления задачи в пустой контейнер",
        storyPoints: 2,
        priority: "critical",
      },
      {
        id: "FC-8",
        title: "Задача № 5",
        description:
          "При редактировании данных карточки, если менять статус, то ничего не происходит. Нужно удалить из контейнера с текущим статусом и добавить в контейнер с новым статусом",
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
        title: "Задача № 6",
        description: "Доработать внешний вид компонента просмотра карточки",
        storyPoints: 3,
        priority: "major",
      },
      {
        id: "MAR-11",
        title: "Задача № 7",
        description: "Стилизовать селекты",
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
        title: "Задача № 8",
        description: "Добавить кастомную валидацию полей",
        storyPoints: 3,
        priority: "minor",
      },
      {
        id: "MAR-13",
        title: "Задача № 9",
        description:
          "Создать стейт для хлебных крошек, передавать текущий путь",
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
        title: "Задача № 10",
        description: "При поиске не учитывать регистр",
        storyPoints: 3,
        priority: "minor",
      },
      {
        id: "MAR-15",
        title: "Задача № 11",
        description:
          "При драг дропе, установить тень текущего элемента через closest, чтобы она не пропадала при наведении на элемент карточки",
        storyPoints: 3,
        priority: "normal",
      },
      {
        id: "MAR-20",
        title: "Задача № 12",
        description:
          "Временной решение с уникальным айди, найти библиотеку с генерацией уникальных ключей",
        storyPoints: 4,
        priority: "major",
      },
      {
        id: "MAR-21",
        title: "Задача № 13",
        description: "Фильтрация через новый стейт или динамическая",
        storyPoints: 3,
        priority: "critical",
      },
      {
        id: "MAR-22",
        title: "Задача № 14",
        description: "Добавить возможность удаления карточек",
        storyPoints: 2,
        priority: "minor",
      },
    ],
  },
];

export {DATA_BOARDS}