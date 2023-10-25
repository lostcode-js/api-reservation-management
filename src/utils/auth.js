const requireAuth = async (request, response, next) => {
    try {
      if (!request.user) {
        throw new Unauthorized('Token inválido');
      }
      next();
    } catch (error) {
      return response.status(401).json({ message: 'Não autorizado' });
    }
  };

  module.exports = requireAuth;
