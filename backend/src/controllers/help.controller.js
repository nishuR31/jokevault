export async function help(request, reply) {
  return reply.sendFile("help.html");
}

export default help;
