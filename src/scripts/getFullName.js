export const getFullName = (lastName, firstName, middleName) => {
  const fullName = []

  !!lastName && fullName.push(lastName.trim())
  !!firstName && fullName.push(firstName.trim())
  !!middleName && fullName.push(middleName.trim())

  return fullName.join(' ')
}