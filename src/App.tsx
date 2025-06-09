import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminCrudTable from './components/AdminCrud';
import ViewUser from './components/ViewUser';
import UserTasks from './components/Tasks_Page';
import {ProtectedRoute} from './components/ProtectedRoute';
import AdminTaskManager from './components/AdminTaskManager';
import Tasks_Page from './components/Tasks_Page';


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/admincrud"
          element={
            <ProtectedRoute>
              <AdminCrudTable />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard"element={
              <ProtectedRoute>

          <AdminTaskManager/>
          </ProtectedRoute>
        }/>
          <Route path="/task"element={
              <ProtectedRoute>
          <Tasks_Page/>
          </ProtectedRoute>

        }/>

         <Route path="/home"element={
              <ProtectedRoute>
          <AdminCrudTable/>
          </ProtectedRoute>

        }/>
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <ViewUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task"
          element={
            <ProtectedRoute>
              <Tasks_Page />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </>
  );
}

export default App;
