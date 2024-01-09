import { observer } from 'mobx-react-lite';
import { LoginForm } from './components';

const App = observer(() => {
  return (
    <div>
      <LoginForm />
    </div>
  );
});

export default App;
