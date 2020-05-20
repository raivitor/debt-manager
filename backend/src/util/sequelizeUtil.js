import axios from 'axios';
import { CONFIGS } from '../config/configs';

export const errorResolver = (err, res) => {
  if (err.errors) {
    return res.status(400).json(err.errors[0].message);
  }
  console.error(err);
  return res.status(400).json({ error: 'Try again later' });
};

export const mergeUserInDebt = async debts => {
  const users = await axios.get(CONFIGS.JSON_PLACEHOLDER_URL);
  if (Array.isArray(debts)) {
    debts = debts.map(debt => {
      debt.setDataValue(
        'user',
        users.data.filter(user => user.id == debt.idUser)[0]
      );
      return debt;
    });
  } else {
    debts.setDataValue(
      'user',
      users.data.filter(user => user.id == debts.idUser)[0]
    );
  }

  return debts;
};
