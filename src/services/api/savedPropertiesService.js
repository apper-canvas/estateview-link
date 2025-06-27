// Local storage key for saved properties
const SAVED_PROPERTIES_KEY = 'estateview_saved_properties'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Get saved properties from localStorage
const getSavedFromStorage = () => {
  try {
    const saved = localStorage.getItem(SAVED_PROPERTIES_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error reading saved properties from storage:', error)
    return []
  }
}

// Save properties to localStorage
const saveToStorage = (properties) => {
  try {
    localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(properties))
  } catch (error) {
    console.error('Error saving properties to storage:', error)
  }
}

export const getSavedProperties = async () => {
  await delay(200)
  return getSavedFromStorage()
}

export const saveProperty = async (propertyId) => {
  await delay(300)
  const saved = getSavedFromStorage()
  
  // Check if already saved
  if (saved.some(item => item.propertyId === propertyId)) {
    throw new Error('Property already saved')
  }
  
  const newSavedProperty = {
    propertyId: propertyId,
    savedDate: new Date().toISOString(),
    notes: ''
  }
  
  const updatedSaved = [...saved, newSavedProperty]
  saveToStorage(updatedSaved)
  
  return newSavedProperty
}

export const removeSavedProperty = async (propertyId) => {
  await delay(200)
  const saved = getSavedFromStorage()
  const filtered = saved.filter(item => item.propertyId !== propertyId)
  
  if (filtered.length === saved.length) {
    throw new Error('Property not found in saved list')
  }
  
  saveToStorage(filtered)
  return true
}

export const updateSavedPropertyNotes = async (propertyId, notes) => {
  await delay(200)
  const saved = getSavedFromStorage()
  const index = saved.findIndex(item => item.propertyId === propertyId)
  
  if (index === -1) {
    throw new Error('Property not found in saved list')
  }
  
  saved[index].notes = notes
  saveToStorage(saved)
  
  return saved[index]
}

export const isSaved = async (propertyId) => {
  await delay(100)
  const saved = getSavedFromStorage()
  return saved.some(item => item.propertyId === propertyId)
}