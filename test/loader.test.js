import compiler from './compiler';

test('Simple sheet', async () => {
  const stats = await compiler('example.xlsx');
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(
    `export default [{"sheet":"sheet1","data":[{"id":1,"name":"Jack","age":20},{"id":2,"name":"Tom","age":18},{"id":3,"name":"Echo","age":15},{"id":4,"name":"Jeff","age":16}]},{"sheet":"Sheet2","data":[{"id":3,"name":"Jack1","age":201},{"id":4,"name":"Tom1","age":181},{"id":5,"name":"Echo1","age":151}]}]`
  );
})

// 解析到某一行
test('ReadOptions sheet sheetRows', async () => {
  const stats = await compiler('example.xlsx', {
    readOptions: {
      sheetRows: 3
    },
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(
    `export default [{"sheet":"sheet1","data":[{"id":1,"name":"Jack","age":20},{"id":2,"name":"Tom\","age":18}]},{"sheet":"Sheet2","data":[{"id":3,"name":"Jack1","age":201},{"id":4,"name":"Tom1","age":181}]}]`
  );
})

test('readOptions sheet sheets string', async () => {
  const stats = await compiler('example.xlsx', {
    readOptions: {
      sheets: 'sheet1',
    },
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`export default [{"id":1,"name":"Jack","age":20},{"id":2,"name":"Tom","age":18},{"id":3,"name":"Echo","age":15},{"id":4,"name":"Jeff","age":16}]`);
})

test('readOptions sheet sheets Number', async () => {
  const stats = await compiler('example.xlsx', {
    readOptions: {
      sheets: 0,
    },
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`export default [{"id":1,"name":"Jack","age":20},{"id":2,"name":"Tom","age":18},{"id":3,"name":"Echo","age":15},{"id":4,"name":"Jeff","age":16}]`);
})

test('readOptions sheet sheets Array', async () => {
  const stats = await compiler('example.xlsx', {
    readOptions: {
      sheets: ['Sheet2'],
    },
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`export default [{"id":3,"name":"Jack1","age":201},{"id":4,"name":"Tom1","age":181},{"id":5,"name":"Echo1","age":151}]`);
})

test('parseOptions sheet Object', async () => {
  const stats = await compiler('example.xlsx', {
    readOptions: {
      sheets: 'sheet1',
    },
    parseOptions: { range: 2, header: ['id', 'name', 'age'] }
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  
  expect(output).toBe(`export default [{"id":2,"name":"Tom","age":18},{"id":3,"name":"Echo","age":15},{"id":4,"name":"Jeff","age":16}]`);
})

test('parseOptions sheet Object callback', async () => {
  const stats = await compiler('example.xlsx', {
    readOptions: {
      sheets: 'sheet1',
    },
    parseOptions: {
      range: 2,
      header: ['id', 'name', 'age'],
      afterParseCallback: (data) => {
        return data.reduce((result, cur) => {
          result[cur.id] = { name: cur.name, age: cur.age };
          return result;
        }, {})
      }
    }
  });
  const output = stats.toJson({ source: true }).modules[0].source; 
  expect(output).toBe(`export default {"2":{"name":"Tom","age":18},"3":{"name":"Echo","age":15},"4":{"name":"Jeff","age":16}}`);
})

test('parseOptions sheet Array', async () => {
  const stats = await compiler('example.xlsx', {
    readOptions: {
      sheets: 'sheet1',
    },
    parseOptions: [{ range: 2, header: ['id', 'name', 'age'] }]
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`export default [{"id":2,"name":"Tom","age":18},{"id":3,"name":"Echo","age":15},{"id":4,"name":"Jeff","age":16}]`);
})

test('parseOptions sheet Array callback', async () => {
  const stats = await compiler('example.xlsx', {
    readOptions: {
      sheets: 'sheet1',
    },
    parseOptions: [{
      range: 2,
      header: ['id', 'name', 'age'],
      afterParseCallback: (data) => {
        return data.reduce((result, cur) => {
          result[cur.id] = { name: cur.name, age: cur.age };
          return result;
        }, {})
      }
    }]
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`export default {"2":{"name":"Tom","age":18},"3":{"name":"Echo","age":15},"4":{"name":"Jeff","age":16}}`);
})
