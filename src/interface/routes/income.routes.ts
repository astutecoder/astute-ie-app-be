import { Router } from 'express';
import { IncomeController } from '../controllers/IncomeController';
import { MongoIncomeRepository } from '../repositories/mongo/MongoIncomeRepository';
import { IncomeService } from '../services/IncomeService';

export const incomeRouter = Router();
const incomeRepository = new MongoIncomeRepository();
const incomeService = new IncomeService(incomeRepository);
const incomeController = new IncomeController(incomeService);

incomeRouter.get('/', incomeController.get);
// incomeRouter.get('/:source', incomeController.getBySource);
incomeRouter.post('/add', incomeController.addIncome);
incomeRouter.patch('/:id', incomeController.update);
incomeRouter.delete('/:id', incomeController.delete);
