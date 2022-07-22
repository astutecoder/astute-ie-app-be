import { Router } from 'express';
import { TeamController } from '../controllers/TeamController';
import { MongoTeamRepository } from '../repositories/mongo/MongoTeamRepository';
import { TeamService } from '../services/TeamService';

export const teamRouter = Router();
const teamRespository = new MongoTeamRepository();
const teamService = new TeamService(teamRespository);
const teamController = new TeamController(teamService);

teamRouter.get('/', teamController.getAll);
teamRouter.post('/add', teamController.addTeam);
