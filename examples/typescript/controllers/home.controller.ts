import { middleware } from "@piston/core";
import { model } from "@piston/database";

export const Index = async (_: any, res: any) => {
  const data = await model("Cat").find({});

  return res.render("index", { data });
};

export const Test = (_: any, res: any) => {
  return res.send("Test");
};

export const MiddlewarePage = {
  Middleware: [middleware("Auth/NotAuthed"), middleware("Auth/Authed")],
  View: (_: any, res: any) => {
    return res.send("If you see that the middleware have not failed");
  },
};
