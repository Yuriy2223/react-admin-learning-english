import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  useRecordContext,
} from "react-admin";
import { Box, Typography } from "@mui/material";

const TopicTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `Edit "${record.title}"` : ""}</span>;
};

export const GrammarTopicEdit = () => (
  <Edit title={<TopicTitle />}>
    <SimpleForm>
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Topic Information
        </Typography>

        <TextInput
          source="title"
          validate={required()}
          fullWidth
          helperText="The main title of the grammar topic"
        />

        <TextInput
          source="description"
          validate={required()}
          multiline
          rows={4}
          fullWidth
          helperText="A brief description of what this topic covers"
        />

        <TextInput
          source="imageUrl"
          fullWidth
          helperText="URL to the topic's image (optional)"
        />

        <SelectInput
          source="difficulty"
          choices={[
            { id: "beginner", name: "Beginner" },
            { id: "intermediate", name: "Intermediate" },
            { id: "advanced", name: "Advanced" },
          ]}
          validate={required()}
          fullWidth
          helperText="Difficulty level of this topic"
        />
      </Box>
    </SimpleForm>
  </Edit>
);
