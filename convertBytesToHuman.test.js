/* eslint-disable no-undef */
/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */

const convertBytesToHuman = require('./convertBytesToHuman.js');


test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false);
  expect(convertBytesToHuman('string')).toBe(false);
  expect(convertBytesToHuman('')).toBe(false);
  expect(convertBytesToHuman(-Infinity)).toBe(false);
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1551859712)).toBe('1.45 GB');
  expect(convertBytesToHuman(1024)).toBe('1.00 KB');
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB');
  expect(convertBytesToHuman(Infinity)).toBe(Infinity);
});
