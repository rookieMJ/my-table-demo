export default function generateData(numRows: number) {
  const names = [
    'Aliceeee',
    'Bobbbbbbbb',
    'Charlie',
    'Davidddddddd',
    'Eve',
    'Frank',
    'Grace',
    'Henry',
    'Isabel',
    'Jackkkkkkkkk',
    'Peterrrrr',
    'Clauuuuuuuuudia',
    'Brandon',
    'Aria',
  ];
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'];
  const phoneBrands = ['HUAWEI', 'iPhone', 'Samsung', 'Xiaomi', 'OnePlus'];

  const data = [];
  for (let i = 1; i <= numRows; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const age = Math.floor(Math.random() * 50) + 18;
    const email = `${name.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const phone = `${phoneBrands[Math.floor(Math.random() * phoneBrands.length)]}${i}`;
    const desc = Math.floor(Math.random() * 5000000000000000) + 27;
    const luckNum = Math.floor(Math.random() * 9000000000000000) + 27;

    data.push({
      id: i,
      name,
      age,
      email,
      phone,
      desc,
      luckNum,
    });
  }

  return data;
}
