import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { AccountTypeSchema } from "@/schemas";
import { zValidator } from "@hono/zod-validator";


const prisma = new PrismaClient();
const app = new Hono()
.get("/", async (c) => {
  const session = await auth();
  
  // Check if the user is authenticated
  if (!session?.user?.id) {
    return c.json({
      error: "Unauthorized",
    }, 401); // Sending a 401 status for unauthorized access
  }

  // Fetch user data from the database
  const data = await prisma.accountType.findMany({
    where: {
      userId: session.user.id,
    },select: {
      id: true,
      name:true,
    }
  });

  return c.json({ data });
})

.post("/",
  zValidator('json', AccountTypeSchema.pick({
    name: true
  })
    
  ),
  async  (c) => {

  const session = await auth();
  const {name} = c.req.valid("json")

  if (!session?.user?.id) {
    return c.json({
      error: "Unauthorized",
    }, 401);
  }

  try {


    const add  = await prisma.accountType.create({
      data: {
      name,
      userId: session.user.id,
      },
    });

    return c.json(
      {  name: add.name },
      201
    );
    } catch (error) {
      return c.json({ error: 'Error creating account' }, 500);
    }
  })


export default app;
