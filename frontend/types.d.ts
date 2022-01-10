interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}
interface LootProps extends DefaultProps {
  accept: (money: number) => void;
}
interface LoginFormProps extends DefaultProps {
  register?: boolean;
}
interface Operation {
  endpoint: string;
  type: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
interface TokenPair {
  accessToken: string;
  refreshToken: string;
}