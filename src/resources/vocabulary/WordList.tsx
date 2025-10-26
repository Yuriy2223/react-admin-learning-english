import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  CreateButton,
  ReferenceInput,
  SelectInput,
  ReferenceField,
  useListContext,
} from "react-admin";

const WordEmpty = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <p>Виберіть тему зі списку вгорі, щоб побачити слова</p>
  </div>
);

export const VocabularyWordList = () => {
  const ListContent = () => {
    const { filterValues } = useListContext();
    const topicId = filterValues?.topicId;

    if (!topicId) {
      return <WordEmpty />;
    }

    return (
      <Datagrid>
        <TextField source="id" label="ID" />
        <TextField source="word" label="Слово" />
        <TextField source="translation" label="Переклад" />
        <TextField source="transcription" label="Транскрипція" />
        <ReferenceField
          source="topicId"
          reference="vocabulary/admin/topics"
          label="Тема"
        >
          <TextField source="title" />
        </ReferenceField>
        <EditButton />
        <DeleteButton />
      </Datagrid>
    );
  };

  return (
    <List
      filters={[
        <ReferenceInput
          key="topic"
          source="topicId"
          reference="vocabulary/admin/topics"
        >
          <SelectInput optionText="title" label="Тема" />
        </ReferenceInput>,
      ]}
      actions={<CreateButton />}
    >
      <ListContent />
    </List>
  );
};
