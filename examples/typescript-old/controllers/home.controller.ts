import { model } from "@piston/database";

export const Index = async (_: any, res: any) => {
  const tasks = await model("Task").find({});
  return res.render("index", { tasks });
};

export const DeleteTask = async (req: any, res: any) => {
  await model("Task").findByIdAndDelete(req.params.id);
  return res.json({ redirect: "/" });
};

export const UpdateTask = async (req: any, res: any) => {
  const task: any = await model("Task").findById(req.params.id);
  task.completed = !task.completed;
  task.save();
  return res.json({ redirect: "/" });
};

export const CreateTask = async (req: any, res: any) => {
  await model("Task").create({ title: req.body.title });
  return res.redirect("/");
};
