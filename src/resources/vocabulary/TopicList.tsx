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
  Button,
  useRecordContext,
} from "react-admin";
import { Link } from "react-router-dom";
import AbcIcon from "@mui/icons-material/Abc";

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

const ShowWordsButton = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Button
      component={Link}
      to={`/vocabulary/admin/words?filter=${JSON.stringify({
        topicId: record.id,
      })}`}
      label="Слова"
      onClick={(e) => e.stopPropagation()}
    >
      <AbcIcon />
    </Button>
  );
};

export const VocabularyTopicList = () => (
  <List filters={topicFilters} actions={<CreateButton />}>
    <Datagrid>
      <TextField source="id" />
      <ImageField source="imageUrl" label="Зображення" />
      <TextField source="title" label="Назва" />
      <TextField source="description" label="Опис" />
      <ChipField source="difficulty" label="Складність" />
      <NumberField source="totalItems" label="Всього слів" />
      <ShowWordsButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
