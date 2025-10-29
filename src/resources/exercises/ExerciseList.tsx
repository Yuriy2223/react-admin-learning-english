import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  FilterButton,
  TopToolbar,
  CreateButton,
  ReferenceInput,
  AutocompleteInput,
  useGetList,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const exerciseFilters = [
  <ReferenceInput
    key="topic"
    source="topicId"
    reference="exercises/admin/topics"
    alwaysOn
  >
    <AutocompleteInput
      optionText="title"
      label="Тема"
      sx={{ minWidth: 300 }}
      clearIcon={null}
    />
  </ReferenceInput>,
];

const Empty = () => (
  <Box textAlign="center" m={5}>
    <Typography variant="h6" gutterBottom>
      Поки немає вправ
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Будь ласка, оберіть тему з фільтра вище, щоб переглянути її вправи
    </Typography>
  </Box>
);

const ExerciseListContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: topics, isLoading } = useGetList("exercises/admin/topics");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentFilter = searchParams.get("filter");
    const filterObj = currentFilter ? JSON.parse(currentFilter) : null;

    if (!filterObj?.topicId && topics && topics.length > 0 && !isLoading) {
      const firstTopicId = topics[0].id;
      searchParams.set("filter", JSON.stringify({ topicId: firstTopicId }));
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [topics, isLoading, navigate, location]);

  return (
    <List
      filters={exerciseFilters}
      actions={<ListActions />}
      empty={<Empty />}
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField source="type" label="Тип" />
        <TextField source="question" label="Питання" />
        <TextField source="correctAnswer" label="Правильна відповідь" />
        <TextField source="points" label="Бали" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export const ExerciseList = ExerciseListContent;
