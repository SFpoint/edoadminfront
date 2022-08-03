export const getFullAge = birthDate => {
  if (birthDate) {
    const birth = new Date(birthDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))

    return birth.toString() !== 'Invalid Date'
      ? (new Date(new Date() - birth)).getFullYear() - 1970
      : ''
  }

  return ''
}
