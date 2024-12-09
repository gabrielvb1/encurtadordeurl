import jwt from 'jsonwebtoken';

export const tokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (req.originalUrl.startsWith('/urls/')) {
    if (!authorization) {
      return res.status(401).send({ error: 'Token de autenticação não informado.' });
    }

    const token = authorization.split(' ')[1];

    try {
      const { id } = jwt.verify(token, process.env.API_PASS);
      req.id = id;
      return next();
    } catch (error) {
      return res.status(401).send({ error: 'Token inválido.' });
    }
  } else {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.API_PASS);
        req.id = id;
      } catch (error) {
        return res.status(401).send({ error: 'Token inválido.' });
      }
    }
    return next();
  }
};

