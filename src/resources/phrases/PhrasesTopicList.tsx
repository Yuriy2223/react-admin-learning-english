import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ChipField,
  EditButton,
  DeleteButton,
  CreateButton,
  ImageField,
  SearchInput,
  SelectInput,
} from "react-admin";

const topicFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <SelectInput
    key="difficulty"
    source="difficulty"
    choices={[
      { id: "beginner", name: "Beginner" },
      { id: "intermediate", name: "Intermediate" },
      { id: "advanced", name: "Advanced" },
    ]}
  />,
];

export const PhrasesTopicList = () => (
  <List filters={topicFilters} actions={<CreateButton />}>
    <Datagrid>
      <TextField source="title" label="Назва" />
      <TextField source="description" label="Опис" />
      <ChipField source="difficulty" label="Складність" />
      <NumberField source="totalItems" label="Всього фраз" />
      <ImageField source="imageUrl" label="Зображення" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
