import express from "express";
import protectRoute from "../middleware/protectRoute.middleware.js";
import {snippetUpdateValidation, snippetValidation} from "../validations/snippet.validation.js";
import { create, deleteSnippet, updateSnippet, view, viewAll } from "../controllers/snippet.controller.js";
import { validate } from "../middleware/validation.middleware.js";

const snippetRoute=express.Router();

snippetRoute.post('/create/:shortId',protectRoute,validate(snippetValidation),create);
snippetRoute.get('/all',protectRoute,viewAll);
snippetRoute.get('/:shortId',view);
snippetRoute.put("/:shortId",protectRoute,validate(snippetUpdateValidation),updateSnippet);
snippetRoute.delete("/:shortId",protectRoute,deleteSnippet);


export default snippetRoute;