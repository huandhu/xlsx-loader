import compiler from './compiler';

test('Has a sheet', async () => {
  const stats = await compiler('example.xlsx', {sheet: 'sheet1'});
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`export default [{"id":1,"name":"Jack","age":20},{"id":2,"name":"Tom","age":18}]`);
})

test('Options empty', async () => {
  const stats = await compiler('example.xlsx');
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`export default [{"sheet":"sheet1","data":[{"id":1,"name":"Jack","age":20},{"id":2,"name":"Tom","age":18}]}]`);
})