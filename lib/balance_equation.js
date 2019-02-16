
// For separating a molecule string into atoms -> e.g. 'H2O' becomes ['H2', 'O']
const regexMolecules = /[\D][a-z]?[\d]*/g

// For splitting an atom string into the element + number -> e.g. 'H2' becomes ['H', '2']
const regexAtoms = /[\D]+|[\d]*/g

const getCountofElements = (element, adjust) => {
  counts = {}
  element.match(regexMolecules).forEach(atom => {
    let a = atom.match(regexAtoms)
    counts[a[0]] = (counts[a[0]] || 0) + (Number(a[1]) || 1) * adjust
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

const doBothSidesHaveEqualElements = (totalCountLeft, totalCountRight) => {
  // console.log('DEBUG: doBothSidesHaveEqualElements() --', totalCountLeft, totalCountRight)
  return Object.entries(totalCountLeft).every(([element, count]) => {
    return totalCountRight[element] === count
  })
}

const balance = (left, right, leftAdjust = [], rightAdjust = [], steps = 1) => {
  if (steps > 20) return 'ERROR: Recursive calculation went for too long'

  // Step 1: Split the side into individual elements
  const leftElements = left.split('+').map(elem => elem.trim())
  const rightElements = right.split('+').map(elem => elem.trim())
  // console.log('DEBUG:', leftElements, rightElements)

  if (leftAdjust.length === 0) leftAdjust = leftElements.map(_ => 1)
  if (rightAdjust.length === 0) rightAdjust = rightElements.map(_ => 1)

  // Step 2: Split each element into individual atoms (with the count)
  const leftElementCounts = leftElements.map((element, i) => getCountofElements(element, leftAdjust[i]))
  const rightElementCounts = rightElements.map((element, i) => getCountofElements(element, rightAdjust[i]))
  // console.log('DEBUG:', leftElementCounts, rightElementCounts)

  // Step 3: Get the total count of each element on each side
  let totalCountLeft = getCombinedCountOfElements(leftElementCounts)
  let totalCountRight = getCombinedCountOfElements(rightElementCounts)
  // console.log('DEBUG:', totalCountLeft, totalCountRight)

  // Step 4: Determine if both sides share elements to know whether problem is solvable
  // console.log('DEBUG: doBothSidesShareAllElements() -', doBothSidesShareAllElements(totalCountLeft, totalCountRight))
  if (!doBothSidesShareAllElements(totalCountLeft, totalCountRight)) {
    return 'ERROR: Unable to solve as both sides of the equation do not have the same elements'
  }

  // Step 5: Try to balance things out, just move from left to right and adjust the coefficient if the elements need to be higher. Then recurse!
  leftElementCounts.forEach((elementCount, i) => {
    for (let element in elementCount) {
      let sanityCheck = 100
      while (totalCountLeft[element] < totalCountRight[element]) {
        leftAdjust[i] += 1
        leftElementCounts[i] = getCountofElements(leftElements[i], leftAdjust[i])
        totalCountLeft = getCombinedCountOfElements(leftElementCounts)

        sanityCheck -= 1
        if (sanityCheck < 0) break
      }
    }
  })
  rightElementCounts.forEach((elementCount, i) => {
    for (let element in elementCount) {
      let sanityCheck = 100
      while (totalCountRight[element] < totalCountLeft[element]) {
        rightAdjust[i] += 1
        rightElementCounts[i] = getCountofElements(rightElements[i], rightAdjust[i])
        totalCountRight = getCombinedCountOfElements(rightElementCounts)

        sanityCheck -= 1
        if (sanityCheck < 0) break
      }
    }
  })

  // console.log('DEBUG:', leftElementCounts, totalCountLeft)
  // console.log('DEBUG:', rightElementCounts, totalCountRight)

  if(!doBothSidesHaveEqualElements(totalCountLeft, totalCountRight)) {
    return balance(left, right, leftAdjust, rightAdjust, steps + 1)
  }

  // Step 6: Return the minimum balanced equation
  return (
    leftElements.map((element, i) => `${leftAdjust[i]}${element}`).join(' + ') +
    ' -> ' +
    rightElements.map((element, i) => `${rightAdjust[i]}${element}`).join(' + ')
  )
}

module.exports = balance;