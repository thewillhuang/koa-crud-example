import { using } from 'bluebird';
import getConnection from './getConnection';

export default function acquireTransaction() {
  return using(getConnection(), tx => {
    return tx.beginTransactionAsync().then(() => {
      return tx;
    });
  }).disposer((tx, promise) => {
    return promise.isFulfilled() ? tx.commitAsync() : tx.rollbackAsync();
  });
}
