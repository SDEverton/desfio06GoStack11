import csvParse from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });
  }
}

export default ImportTransactionsService;
