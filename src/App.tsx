import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Blueprint } from './pages/Blueprint';
import { Factory } from './pages/Factory';
import { Construction } from './pages/Construction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="blueprint" element={<Blueprint />} />
          <Route path="factory" element={<Factory />} />
          <Route path="construction" element={<Construction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
