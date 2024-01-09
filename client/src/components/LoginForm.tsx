import { FC, FormEvent, useState } from 'react';
// import { UseStore } from '../hooks';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  //   const { store } = UseStore();

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Почта: ${email}. Пароль: ${password}`);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="email"
        name="email"
        placeholder="Электронная почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>Войти</button>
    </form>
  );
};

export { LoginForm };
