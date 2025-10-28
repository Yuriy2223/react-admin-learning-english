import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  minValue,
} from "react-admin";
import { Box, Typography, Alert } from "@mui/material";

export const GrammarQuestionEdit = () => {
  return (
    <Edit title="Редагувати питання з граматики">
      <SimpleForm>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Інформація про питання
          </Typography>

          <ReferenceInput source="topicId" reference="grammar/admin/topics">
            <SelectInput
              optionText="title"
              validate={required()}
              fullWidth
              helperText="Оберіть тему, до якої належить це питання"
            />
          </ReferenceInput>

          <TextInput
            source="question"
            label="Питання"
            validate={required()}
            multiline
            rows={3}
            fullWidth
            helperText="Текст питання"
          />

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Варіанти відповідей
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            Додайте щонайменше 2 варіанти. Індекс правильної відповіді
            починається з 0 (перший варіант = 0, другий = 1, і т.д.)
          </Alert>

          <ArrayInput source="options" label="Опції" validate={required()}>
            <SimpleFormIterator inline>
              <TextInput
                source=""
                label="Варіант"
                helperText={false}
                validate={required()}
                fullWidth
                sx={{ width: "100%" }}
              />
            </SimpleFormIterator>
          </ArrayInput>

          <NumberInput
            source="correctAnswer"
            label="Правильна відповідь"
            validate={[required(), minValue(0)]}
            fullWidth
            helperText="Індекс правильної відповіді (0 для першого варіанту, 1 для другого, і т.д.)"
          />

          <TextInput
            source="explanation"
            label="Пояснення"
            multiline
            rows={3}
            fullWidth
            helperText="Необов'язкове пояснення правильної відповіді"
          />
        </Box>
      </SimpleForm>
    </Edit>
  );
};
