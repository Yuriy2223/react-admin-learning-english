import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  CreateButton,
  ReferenceInput,
  AutocompleteInput,
  TopToolbar,
  useGetList,
} from "react-admin";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const phraseFilters = [
  <ReferenceInput
    key="topic"
    source="topicId"
    reference="phrases/admin/topics"
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

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

const PhraseListContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: topics, isLoading } = useGetList("phrases/admin/topics");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentTopicId = searchParams.get("filter");
    const filterObj = currentTopicId ? JSON.parse(currentTopicId) : null;

    if (!filterObj?.topicId && topics && topics.length > 0 && !isLoading) {
      const firstTopicId = topics[0].id;
      searchParams.set("filter", JSON.stringify({ topicId: firstTopicId }));
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [topics, isLoading, navigate, location]);

  return (
    <List filters={phraseFilters} actions={<ListActions />} perPage={25}>
      <Datagrid>
        <TextField source="phrase" label="Фраза" />
        <TextField source="translation" label="Переклад" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export const PhraseList = PhraseListContent;
