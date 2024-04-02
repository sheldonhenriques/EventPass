const ejs = require('ejs');
const fs = require('fs');

describe('Category Template', () => {
  test('renders categories correctly', () => {
    const categories = [
      { name: 'Category 1', image: 'category1.jpg' },
      { name: 'Category 2', image: 'category2.jpg' },
    ];

    const template = fs.readFileSync('views/categories/category.ejs', 'utf8');

    const renderedTemplate = ejs.render(template, { categories });
    expect(renderedTemplate).toMatchSnapshot();
  });
});