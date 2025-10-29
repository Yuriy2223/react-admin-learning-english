import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  CreateButton,
  TopToolbar,
} from "react-admin";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const ExerciseTopicList = () => (
  <List actions={<ListActions />}>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Назва" />
      <TextField source="description" label="Опис" />
      <TextField source="difficulty" label="Складність" />
      <TextField source="totalItems" label="Всього вправ" />
      <TextField source="totalScore" label="Всього балів" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
