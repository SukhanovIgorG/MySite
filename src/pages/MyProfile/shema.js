import Joi from 'joi';
import {REG_EMAIL} from '../../constants/constants';

export const schema = Joi.object({
  name: Joi.string().required().max(45),
  email: Joi.string().required().max(45).regex(REG_EMAIL, 'email'),
});
