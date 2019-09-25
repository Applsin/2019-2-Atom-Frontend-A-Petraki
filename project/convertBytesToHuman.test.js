/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */

const convertBytesToHuman= require('./convertBytesToHuman.js')


test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman("string")).toBe(false)
  expect(convertBytesToHuman("")).toBe(false)
  expect(convertBytesToHuman(-Infinity)).toBe(false)
}
)

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1)).toBe(1)
  expect(convertBytesToHuman(0)).toBe(0)
  expect(convertBytesToHuman(Infinity)).toBe(Infinity)
})

// другая группа проверок
