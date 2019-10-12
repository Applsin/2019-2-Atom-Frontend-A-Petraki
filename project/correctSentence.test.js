const correctSentence = require('./correctSentence.js')

test('returns correct sentence', () => {
  expect(correctSentence("a")).toBe("A.")
  expect(correctSentence("a a")).toBe("A a.")
  expect(correctSentence("a,")).toBe("A,.")
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.")
})
