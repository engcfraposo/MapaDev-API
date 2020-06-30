import axios from 'axios';
import * as Yup from 'yup';
import { Request, Response } from 'express';
import Dev from '../models/Dev';

import parseStringAsArray from '../utils/parseStringAsArray';

export default {
  async index(request: Request, response: Response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request: Request, response: Response) {
    const schema = Yup.object().shape({
      github_username: Yup.string().required(),
      techs: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails.' });
    }

    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`,
      );

      const { login, avatar_url, html_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name: login,
        avatar_url,
        html_url,
        bio,
        techs: techsArray,
        location,
      });
    }

    return response.json(dev);
  },
};
