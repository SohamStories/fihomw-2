import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { AccountTypeSchema } from "@/schemas";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { z } from "zod";

const prisma = new PrismaClient();
const app = new Hono()


.use(cors({
  origin: "http://localhost:3000", // Ensure this matches your frontend
  credentials: true,
}))


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
      userId:session.user.id,
    },select: {
      id: true,
      name:true,
    }
  });

  return c.json({ data });
})

.get("/:id", 
  zValidator("param",z.object({
    id: z.string().optional(),
  })),

  async (c) => {

    const {id } = c.req.valid("param");

if(!id) {
    return c.json({
      error: "Missing id"
    }, 400);
}

    const session = await auth();
    
    // Check if the user is authenticated
    if (!session?.user?.id) {
      return c.json({
        error: "Unauthorized",
      }, 401); // Sending a 401 status for unauthorized access
    }
  
    try {
      const data = await prisma.accountType.findUnique({
        where: { id },
        select: { id: true, name: true, userId: true },
      });


if(data?.userId !== session.user.id) {
   return c.json({ error: "Forbidden" }, 403);
}

      if (!data) {
        return c.json(
          {
            error: 'Account type not found',
          },
          404
        );
      }

      return c.json( {id: data.id , name: data.name});
    } catch (error) {
      return c.json(
        {
          error: 'Internal server error',
        },
        500
      );
    }
  }
)

.post("/",
  zValidator("json", AccountTypeSchema.pick({
    name: true
  })
    
  ),
  async  (c) => {
 const values = c.req.valid("json")

  const session = await auth();

  if (!session?.user?.id) {
    return c.json({
      error: "Unauthorized",
    }, 401);
  }
const userId =session?.user?.id



    const add  = await prisma.accountType.create({
      data: {
      ...values,
      userId: userId,
      },
    });
    

    return c.json(
      {  add },
      201
    );
    
  })

  .post("/bulk-delete",
    zValidator("json", z.object({
      ids: z.array(z.string()),
    })),
    async (c) => {
      const values = c.req.valid("json");
  
      const session = await auth();
  
      if (!session?.user?.id) {
        return c.json({
          error: "Unauthorized",
        }, 401);
      }
  
      const userId = session.user.id;
  
      // Deleting multiple accountType records for the user
      const deleted = await prisma.accountType.deleteMany({
        where: {
          id: { in: values.ids },
          userId: userId,
        },
      });
  
      return c.json({ deleted }, 200);
    }
  )

  .patch("/:id",
    zValidator("param",
      z.object({
        id: z.string(),
      }),
    ),
    zValidator("json", AccountTypeSchema.pick({
      name: true,
    })),
    async (c) => {
      const values = c.req.valid("json");
      const { id } = c.req.valid("param");
  
      const session = await auth();
  
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
  
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
  
      try {
        const updatedaccountType = await prisma.accountType.update({
          where: { id },
          data: values,
        });
  
        return c.json({ updatedaccountType }, 200);
      } catch (error) {
        return c.json({ error: "Failed to update account type" }, 500);
      }
    }
  )


  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
  
      const session = await auth();
  
      if (!session?.user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
  
      try {
        await prisma.accountType.delete({
          where: { id },
        });
  
        return c.json({ message: "Account type deleted successfully" }, 200);
      } catch (error) {
        return c.json({ error: "Failed to delete account type" }, 500);
      }
    }
  );
  
  



export default app;
