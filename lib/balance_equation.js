
// For separating a molecule string into atoms -> e.g. 'H2O' becomes ['H2', 'O']
const regexMolecules = /[\D][a-z]?[\d]*/g

// For splitting an atom string into the element + number -> e.g. 'H2' becomes ['H', '2']
const regexAtoms = /[\D]+|[\d]*/g

const getCountofElements = (molecule, i) => {
  counts = {}
  molecule.match(regexMolecules).forEach(atom => {
    let a = atom.match(regexAtoms)
    counts[a[0]] = (counts[a[0]] || 0) + (Number(a[1]) || 1)
  })
  return counts
}

const getCombinedCountOfElements = (elements) => {
  let combinedCount = {}
  elements.forEach(element => {
    for (let atom in element) {
      combinedCount[atom] = (combinedCount[atom] || 0) + element[atom]
    }
  })
  return combinedCount
}

// Assumes both arguments are objects with the keys representing atoms and values as any number
// Returns true if both sides have the same elements, false otherwise, counts do not matter
const doBothSidesShareAllElements = (leftSide, rightSide) => {
  let counts = {}
  for (let atom in leftSide)  { counts[atom] = (counts[atom] || 0) + 1 }
  for (let atom in rightSide) { counts[atom] = (counts[atom] || 0) + 1 }

  return Object.values(counts).every(count => count === 2)
}

const balance = (left, right) => {
  // Step 1: Split the side into individual elements
  const leftElements = left.split('+').map(elem => elem.trim())
  const rightElements = right.split('+').map(elem => elem.trim())
  console.log('DEBUG:', leftElements, rightElements)

  // Step 2: Split each element into individual atoms (with the count)
  const leftElementCounts = leftElements.map(getCountofElements)
  const rightElementCounts = rightElements.map(getCountofElements)
  console.log('DEBUG:', leftElementCounts, rightElementCounts)

  // Step 3: Get the starting count of each element on each side
  const minCountLeft = getCombinedCountOfElements(leftElementCounts)
  const minCountRight = getCombinedCountOfElements(rightElementCounts)
  console.log('DEBUG:', minCountLeft, minCountRight)

  // Step 4: Determine if both sides share elements to know whether problem is solvable
  console.log('DEBUG: doBothSidesShareAllElements() -', doBothSidesShareAllElements(minCountLeft, minCountRight))

  // Step 5: Determine if it's possible to balance the sides based on element counts (get the min steps + starting point or something)
  // TODO Step 5

  // Step 6: Return the minimum balanced equation
  // TODO Step 6
  return `${left} = ${right}`
}

module.exports = balance;