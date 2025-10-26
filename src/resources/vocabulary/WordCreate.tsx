import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
} from "react-admin";

export const VocabularyWordCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="word" label="Слово" validate={required()} fullWidth />
      <TextInput
        source="translation"
        label="Переклад"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="transcription"
        label="Транскрипція"
        validate={required()}
        fullWidth
      />
      <TextInput source="audioUrl" label="URL аудіо" fullWidth />

      <ReferenceInput source="topicId" reference="vocabulary/admin/topics">
        <SelectInput optionText="title" validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
