import { Card, CardContent, CardHeader } from "@mui/material";
import { Title } from "react-admin";

export const Dashboard = () => (
  <Card>
    <Title title="English Learning Admin" />
    <CardHeader title="Панель адміністратора" />
    <CardContent>
      <p>Ласкаво просимо до адмін-панелі додатку English Learning!</p>
      <p>Оберіть розділ зліва для управління контентом.</p>
    </CardContent>
  </Card>
);
