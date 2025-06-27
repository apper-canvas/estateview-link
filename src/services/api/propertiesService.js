import propertiesData from '@/services/mockData/properties.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getAllProperties = async () => {
  await delay(300)
  return [...propertiesData.properties]
}

export const getPropertyById = async (id) => {
  await delay(200)
  const property = propertiesData.properties.find(p => p.Id === id)
  if (!property) {
    throw new Error('Property not found')
  }
  return { ...property }
}

export const createProperty = async (propertyData) => {
  await delay(400)
  const newProperty = {
    ...propertyData,
    Id: Math.max(...propertiesData.properties.map(p => p.Id)) + 1,
    listingDate: new Date().toISOString().split('T')[0]
  }
  propertiesData.properties.push(newProperty)
  return { ...newProperty }
}

export const updateProperty = async (id, propertyData) => {
  await delay(300)
  const index = propertiesData.properties.findIndex(p => p.Id === id)
  if (index === -1) {
    throw new Error('Property not found')
  }
  propertiesData.properties[index] = { ...propertiesData.properties[index], ...propertyData }
  return { ...propertiesData.properties[index] }
}

export const deleteProperty = async (id) => {
  await delay(200)
  const index = propertiesData.properties.findIndex(p => p.Id === id)
  if (index === -1) {
    throw new Error('Property not found')
  }
  propertiesData.properties.splice(index, 1)
  return true
}