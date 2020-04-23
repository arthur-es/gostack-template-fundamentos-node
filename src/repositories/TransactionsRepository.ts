import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  type: 'income' | 'outcome';
  value: number;
  title: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') income += transaction.value;
      if (transaction.type === 'outcome') outcome += transaction.value;
    });

    const balance = income - outcome;

    return {
      income,
      outcome,
      total: balance,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = {
      id: uuid(),
      title,
      type,
      value,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
