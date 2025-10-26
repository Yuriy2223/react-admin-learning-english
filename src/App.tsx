import { Admin, Resource } from "react-admin";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { Dashboard } from "./components/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import AbcIcon from "@mui/icons-material/Abc";
import { UserList } from "./resources/users/UserList";
import { UserEdit } from "./resources/users/UserEdit";
import { UserShow } from "./resources/users/UserShow";
import { VocabularyTopicList } from "./resources/vocabulary/TopicList";
import { VocabularyTopicEdit } from "./resources/vocabulary/TopicEdit";
import { VocabularyTopicCreate } from "./resources/vocabulary/TopicCreate";
import { VocabularyWordList } from "./resources/vocabulary/WordList";
import { VocabularyWordEdit } from "./resources/vocabulary/WordEdit";
import { VocabularyWordCreate } from "./resources/vocabulary/WordCreate";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      title="English Learning Admin"
    >
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        icon={PeopleIcon}
        options={{ label: "Користувачі" }}
      />

      <Resource
        name="vocabulary/admin/topics"
        list={VocabularyTopicList}
        edit={VocabularyTopicEdit}
        create={VocabularyTopicCreate}
        icon={BookIcon}
        options={{ label: "Vocabulary Topics" }}
      />

      <Resource
        name="vocabulary/admin/words"
        list={VocabularyWordList}
        edit={VocabularyWordEdit}
        create={VocabularyWordCreate}
        icon={AbcIcon}
        options={{ label: "Vocabulary Words" }}
      />
    </Admin>
  );
}

export default App;
