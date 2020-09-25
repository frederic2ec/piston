import { middleware } from "@piston/core";

export const Index = (_: any, res: any) => {
  return res.render("index", { data: "test 124" });
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
