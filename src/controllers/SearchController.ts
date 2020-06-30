import { Request, Response } from 'express';
import * as Yup from 'yup';
import parseStringAsArray from '../utils/parseStringAsArray';
import Dev from '../models/Dev';

export default {
  async index(request: Request, response: Response) {
    const schema = Yup.object().shape({
      techs: Yup.string(),
      latitude: Yup.number(),
      longitude: Yup.number(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails.' });
    }
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(String(techs));

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ devs });
  },
};
