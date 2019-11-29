import jwt from "jsonwebtoken";

export default async function(request, response, next) {
  const token = request.cookies.token;
  try {
    const user = await jwt.verify(token, "secret");
    if (user) {
      request.user = user;
      next();
    } else {
      response.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
}
