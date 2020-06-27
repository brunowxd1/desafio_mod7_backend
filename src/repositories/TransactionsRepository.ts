import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    let income = 0;
    let outcome = 0;
    let total = 0;

    // eslint-disable-next-line no-return-assign
    transactions.forEach(el =>
      el.type === 'income'
        ? (income += Number(el.value))
        : (outcome += Number(el.value)),
    );
    total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
