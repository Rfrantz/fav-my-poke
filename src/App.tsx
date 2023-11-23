import { CustomContainer } from './App.styles';
import { AppRoutes } from './routes';

function App() {
  return (
    <div>
      <CustomContainer className="container-fluid d-flex justify-content-center align-items-center flex-wrap">
        <AppRoutes />
      </CustomContainer>
    </div>
  );
}

export default App;
