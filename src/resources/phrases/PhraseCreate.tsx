import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
} from "react-admin";

export const PhraseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="phrase"
        label="Фраза"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="translation"
        label="Переклад"
        validate={required()}
        fullWidth
      />
      <TextInput source="audioUrl" label="URL аудіо" fullWidth />

      <ReferenceInput source="topicId" reference="phrases/admin/topics">
        <SelectInput optionText="title" validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
