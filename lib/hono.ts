import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";


export const client = hc<AppType>(process.env.T_AUTH_URL!);
