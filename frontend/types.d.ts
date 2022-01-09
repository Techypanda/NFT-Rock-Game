interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}
interface LoginFormProps extends DefaultProps {
  register?: boolean;
}
interface Operation {
  endpoint: string;
  type: 'GET' | 'POST' | 'PUT' | 'DELETE';
}