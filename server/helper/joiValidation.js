
import Joi from 'joi';

const schema = Joi.object({
    accno: Joi.string().required(),
    name: Joi.string().required(),
    branch: Joi.string().required(),
    amount: Joi.number().required(),
    mechanic_id:Joi.string().required(),
    bank:Joi.string().required()
  });

  export default schema;