import csvParse from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transections: string[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);

      transections.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    return { categories, transections };
  }
}

export default ImportTransactionsService;
