import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/organisms/Header'
import BrowsePage from '@/components/pages/BrowsePage'
import PropertyDetailPage from '@/components/pages/PropertyDetailPage'
import SavedPropertiesPage from '@/components/pages/SavedPropertiesPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/saved" element={<SavedPropertiesPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App